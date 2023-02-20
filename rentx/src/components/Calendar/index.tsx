import React from 'react';
import { Calendar as CustomCalendar , LocaleConfig} from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

import { generateInterval } from './generateInterval';

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DayProps) => void;
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme()

  return (
    <CustomCalendar 
      renderArrow={( direction ) => 
        <Feather 
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }

      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        marginBottom: 10,
        paddingBottom: 10
      }}

      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { generateInterval }