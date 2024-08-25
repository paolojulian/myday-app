import { colors } from '@/constants/Colors';
import { useJournal } from '@/hooks/services/journal/useJournal';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppSafeAreaView from '../common/AppSafeAreaView';
import Container from '../common/Container';
import MainHeader from '../common/MainHeader';
import Row from '../common/Row';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';
import TextArea from '../common/forms/TextArea';
import TextField from '../common/forms/TextField';
import ChevronLeftIcon from '../common/icons/ChevronLeftIcon';
import ChevronRightIcon from '../common/icons/ChevronRightIcon';
import {
  formatDateFilter,
  JOURNAL_VALIDATION_SCHEMA,
  JournalFormValues,
} from './JournalWorkArea.utils';
import { Formik } from 'formik';
import { useDebounceCallback } from 'usehooks-ts';
import useUpdateOrCreateJournal from '@/hooks/services/journal/useUpdateOrCreateJournal';

function JournalWorkArea() {
  const [date, setDate] = useState(new Date());
  const { data } = useJournal(date);
  const { mutateAsync: updateJournalAsync } = useUpdateOrCreateJournal(date);

  const handlePrevPress = (): void => {
    setDate(dayjs(date).subtract(1, 'day').toDate());
  };

  const handleNextPress = (): void => {
    setDate(dayjs(date).add(1, 'day').toDate());
  };

  const validateAndHandleFieldUpdate = async (fieldName: keyof JournalFormValues, value: any) => {
    try {
      await JOURNAL_VALIDATION_SCHEMA.validateAt(fieldName, { [fieldName]: value });
      updateJournalAsync({ [fieldName]: value });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const debouncedHandleChange = useDebounceCallback(validateAndHandleFieldUpdate, 500);

  return (
    <AppSafeAreaView>
      <MainHeader subtitle="Journal" color={colors.v2.red} />

      <ScrollView>
        <Formik<JournalFormValues>
          key={date.toISOString()}
          onSubmit={() => {}} // We don't need this for optimistically updating the UI
          validationSchema={JOURNAL_VALIDATION_SCHEMA}
          initialValues={{
            title: data?.title || '',
            description: data?.description || '',
          }}
        >
          {({ handleBlur, setFieldValue, values, errors, touched }) => (
            <Container style={{ flex: 1 }}>
              <Stack style={{ gap: 16 }}>
                <Row style={{ marginVertical: 16 }}>
                  <TouchableOpacity onPress={handlePrevPress}>
                    <ChevronLeftIcon />
                  </TouchableOpacity>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <ThemedText variant="header-md">{formatDateFilter(date)}</ThemedText>
                  </View>
                  <TouchableOpacity onPress={handleNextPress}>
                    <ChevronRightIcon />
                  </TouchableOpacity>
                </Row>
                <Stack style={{ backgroundColor: colors.v2.black, gap: 8 }}>
                  <TextField
                    onChangeText={text => {
                      setFieldValue('title', text);
                      debouncedHandleChange('title', text);
                    }}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    label="Title"
                    isError={!!errors.title && !!touched.title}
                    errorMessage={errors.title}
                    placeholder={dayjs(date).format('MMM D, YYYY')}
                  />
                  <TextArea
                    onChangeText={text => {
                      setFieldValue('description', text);
                      debouncedHandleChange('description', text);
                    }}
                    onBlur={handleBlur('description')}
                    label="Journal"
                    placeholder="What did you do today?"
                    value={values.description}
                    isError={!!errors.description && !!touched.description}
                    errorMessage={errors.description}
                    numberOfLines={10}
                    maxLength={5000}
                    minHeight={400}
                  />
                </Stack>
              </Stack>
            </Container>
          )}
        </Formik>
      </ScrollView>
    </AppSafeAreaView>
  );
}

export default JournalWorkArea;
