import { addVariableIfDefined } from '@/utils/add-variable-if-defined';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';
import { Journal, JournalQueryKeys } from './journal.types';
import { useJournal } from './useJournal';

type SupportedJournalFields = Pick<Journal, 'title' | 'description' | 'updated_at'>;

const useUpdateOrCreateJournal = (date: Date) => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();
  const { data } = useJournal(date);

  const hasJournalForDate: boolean = !!data;

  async function setup(journal: Partial<SupportedJournalFields>) {
    const statement = hasJournalForDate ? buildUpdateStatement(journal) : buildCreateStatement();
    const variables =
      hasJournalForDate && !!data
        ? buildUpdateVariables(data.id, journal)
        : buildCreateVariables(journal, date);

    return await db.runAsync(statement, variables);
  }

  return useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate(query) {
          if (query.queryKey[0] === JournalQueryKeys.journal) {
            console.log('invalidating journal query');
          }
          return query.queryKey[0] === JournalQueryKeys.journal;
        },
      });
      return response;
    },
  });
};

export default useUpdateOrCreateJournal;

const buildUpdateStatement = (journal: Partial<SupportedJournalFields>) => {
  const setClauses = Object.keys(journal).map(key => `${key} = $${key}`);
  const setStatement = setClauses.join(', ');

  return /* sql */ `
    UPDATE journal
    SET ${setStatement}, updated_at = $updatedAt
    WHERE id = $id
  `;
};
const buildUpdateVariables = (id: Journal['id'], journal: Partial<SupportedJournalFields>) => {
  const now_epoch = convertDateToEpoch(new Date());
  let variables: Record<string, any> = {
    $id: id,
    $updatedAt: now_epoch,
  };
  addVariableIfDefined(variables, 'title', journal?.title || '');
  addVariableIfDefined(variables, 'description', journal?.description || '');

  return variables;
};

const buildCreateStatement = () => {
  const CREATE_JOURNAL = `
  INSERT INTO journal (title, description, entry_date, created_at, updated_at)
  VALUES ($title, $description, $entryDate, $createdAt, $updatedAt);
`;
  return CREATE_JOURNAL;
};

/**
 * @param journal Journal object
 * @param date The date of the journal
 */
const buildCreateVariables = (journal: Partial<SupportedJournalFields>, date: Date) => {
  const now_epoch = convertDateToEpoch(new Date());
  const entryDate = convertDateToEpoch(date);

  return {
    $title: journal?.title || dayjs().format('MMM D, YYYY'),
    $description: journal?.description || '',
    $entryDate: entryDate,
    $createdAt: now_epoch,
    $updatedAt: now_epoch,
  };
};
