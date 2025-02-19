import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarCustom } from '@/components/ui/calendarCustom';
import { Button } from '@/components/ui/button';

export default function DatePickerField({ name, label, control }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={'outline'} className="w-full pl-3 text-left">
                  {field.value ? (
                    format(field.value, 'dd.MM.yyyy', { locale: ru })
                  ) : (
                    <span className="opacity-50">{label}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarCustom
                captionLayout="dropdown-buttons"
                fromYear={1960}
                toYear={2030}
                locale={ru}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
