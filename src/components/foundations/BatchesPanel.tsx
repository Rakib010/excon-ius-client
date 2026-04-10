import { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  type FoundationEntity,
  useCreateBatchMutation,
  useDeleteBatchMutation,
  useGetBatchesQuery,
  useGetDepartmentsQuery,
  useUpdateBatchMutation,
} from "@/redux/features/foundations/foundations.api";
import { mapBatches, mapDepartments, type Batch } from "@/components/foundations/foundations.types";
import { IconEdit, IconTrash } from "@/components/ui/Icons";
import { toast } from "react-toastify";

export function BatchesPanel() {
  const { data: departmentsRaw = [] } = useGetDepartmentsQuery();
  const { data: rowsRaw = [], isLoading, error } = useGetBatchesQuery();

  const deptOptions = useMemo(() => {
    const deps = mapDepartments(departmentsRaw as FoundationEntity[]);
    return deps.map((d) => ({ id: d.id, label: `${d.name} (${d.code})` }));
  }, [departmentsRaw]);

  const rows = mapBatches(rowsRaw as FoundationEntity[]);

  const [createBatch, { isLoading: creating }] = useCreateBatchMutation();
  const [updateBatch, { isLoading: updating }] = useUpdateBatchMutation();
  const [deleteBatch, { isLoading: deleting }] = useDeleteBatchMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Batch | null>(null);
  const [deptId, setDeptId] = useState<number>(0);
  const [name, setName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (deptOptions.length > 0 && !deptId) setDeptId(deptOptions[0]!.id);
  }, [deptId, deptOptions]);

  const openCreate = () => {
    setEditing(null);
    setDeptId(deptOptions[0]?.id ?? 0);
    setName("");
    setFormError(null);
    setOpen(true);
  };

  const openEdit = (b: Batch) => {
    setEditing(b);
    setDeptId(b.dept_id);
    setName(b.name);
    setFormError(null);
    setOpen(true);
  };

  const submit = async () => {
    setFormError(null);
    if (!deptId || !name.trim()) {
      setFormError("Department and batch name are required.");
      return;
    }
    try {
      const payload = { dept_id: deptId, name: name.trim() };
      if (editing) await updateBatch({ id: editing.id, data: payload }).unwrap();
      else await createBatch(payload).unwrap();
      setOpen(false);
      toast.success(editing ? "Batch updated." : "Batch created.");
    } catch (e: unknown) {
      const msg = getErrorMessage(e, "Could not save batch.");
      setFormError(msg);
      toast.error(msg);
    }
  };

  const onDelete = async (b: Batch) => {
    if (!window.confirm(`Delete batch "${b.name}"? This may affect sections.`)) return;
    try {
      await deleteBatch(b.id).unwrap();
      toast.success("Batch deleted.");
    } catch (e: unknown) {
      toast.error(getErrorMessage(e, "Could not delete batch."));
    }
  };

  return (
    <>
      <div className="foundations__toolbar">
        <div className="foundations__toolbar-left">
          <h2 className="foundations__h2" style={{ margin: 0 }}>
            Batches
          </h2>
          <span className="foundations__muted" style={{ margin: 0 }}>
            Batches belong to a department.
          </span>
        </div>
        <div className="foundations__toolbar-right">
          {deptOptions.length === 0 ? <span className="foundations__muted">Create a department first.</span> : null}
          <button className="foundations__btn" type="button" onClick={openCreate} disabled={deptOptions.length === 0}>
            + Add batch
          </button>
        </div>
      </div>

      {isLoading ? <p className="foundations__muted">Loading…</p> : null}
      {error ? <p className="foundations__error">Could not load batches.</p> : null}

      <div className="foundations__table-wrap">
        <table className="foundations__table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Batch</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="foundations__empty">
                  No batches yet.
                </td>
              </tr>
            ) : (
              rows.map((b) => (
                <tr key={b.id}>
                  <td>{b.dept_name || "—"}</td>
                  <td>
                    <strong>{b.name}</strong>
                  </td>
                  <td>
                    <div className="foundations__actions">
                      <button type="button" className="foundations__icon-btn" onClick={() => openEdit(b)} aria-label="Edit">
                        <IconEdit />
                      </button>
                      <button
                        type="button"
                        className="foundations__icon-btn foundations__icon-btn--danger"
                        disabled={deleting}
                        onClick={() => void onDelete(b)}
                        aria-label="Delete"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        title={editing ? "Edit batch" : "Add batch"}
        onClose={() => setOpen(false)}
        footer={
          <div className="foundations__modal-actions">
            <button className="foundations__btn foundations__btn--ghost" type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="foundations__btn" type="button" disabled={creating || updating} onClick={() => void submit()}>
              {creating || updating ? "Saving…" : "Save"}
            </button>
          </div>
        }
      >
        <div className="foundations__form">
          <label className="foundations__field">
            <span>Department</span>
            <select value={deptId} onChange={(e) => setDeptId(Number(e.target.value))}>
              {deptOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="foundations__field">
            <span>Batch name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. 10" />
          </label>
          {formError ? <div className="foundations__error">{formError}</div> : null}
        </div>
      </Modal>
    </>
  );
}

