/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface Entity {
  id: string;
}

const deepEquals = <Model extends Entity>(a: Model, b: Model): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (let i = 0; i < aKeys.length; i++) {
    if (!bKeys.includes(aKeys[i])) return false;
  }

  for (let i = 0; i < bKeys.length; i++) {
    if (!aKeys.includes(bKeys[i])) return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    const aValue = (a as any)[aKeys[i]];
    const bValue = (b as any)[bKeys[i]];

    if (aValue !== bValue) return false;
  }

  return true;
};

interface DiffResult<Model extends Entity> {
  update: Model[];
  delete: Model[];
}

export const compare = <Model extends Entity>(
  oldData: Model[],
  newData: Model[],
): DiffResult<Model> => {
  const diff: DiffResult<Model> = {
    update: [],
    delete: [],
  };

  const newDataIds = newData.map(e => e.id);
  const toDelete = oldData
    .map(e => e.id)
    .filter(id => !newDataIds.includes(id))
    .map(id => oldData.find(e => e.id === id)!);

  diff.delete = toDelete;

  const deletedIds = toDelete.map(e => e.id);
  const toUpdate = oldData.filter(e => !deletedIds.includes(e.id));

  // ?: Maybe adding a way to atuo create those entities that are not in the old data array
  if (newData.length !== toUpdate.length) {
    throw new Error(`Unable to updated arrays of different size`);
  }

  for (let i = 0; i < toUpdate.length; i++) {
    const isEqual = deepEquals(toUpdate[i], newData[i]);
    if (!isEqual) diff.update.push(newData[i]);
  }

  return diff;
};
