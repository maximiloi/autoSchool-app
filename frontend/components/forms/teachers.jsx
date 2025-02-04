'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  lastName: z.string().min(2, 'Введите фамилию'),
  firstName: z.string().min(2, 'Введите имя'),
  middleName: z.string().optional(),
  activityType: z.enum(['theory', 'practice'], { required_error: 'Выберите вид деятельности' }),
  birthDate: z.date().optional(),
  birthPlace: z.string().min(2, 'Введите место рождения'),
  address: z.string().min(2, 'Введите адрес'),
  licenseSeries: z.string().optional(),
  licenseNumber: z.string().optional(),
  licenseIssueDate: z.date().optional(),
  snils: z.string().length(11, 'Введите корректный СНИЛС'),
});

export default function TeachersForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: '',
      firstName: '',
      middleName: '',
      activityType: 'theory',
      birthDate: null,
      birthPlace: '',
      address: '',
      licenseSeries: '',
      licenseNumber: '',
      licenseIssueDate: null,
      snils: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      <h2 className="mb-4 mt-6 text-lg font-semibold">
        📋 Редактировать преподавателей и мастеров
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <InputField name="lastName" label="Фамилия" control={form.control} />
            <InputField name="firstName" label="Имя" control={form.control} />
            <InputField name="middleName" label="Отчество" control={form.control} />
          </div>

          <FormField
            control={form.control}
            name="activityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вид деятельности</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="theory">Преподаватель теории</SelectItem>
                    <SelectItem value="practice">Преподаватель практики</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DatePicker name="birthDate" label="Дата рождения" control={form.control} />
          <InputField name="birthPlace" label="Место рождения" control={form.control} />
          <InputField name="address" label="Адрес" control={form.control} />

          <h3 className="text-md font-semibold">Водительское удостоверение</h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField name="licenseSeries" label="Серия" control={form.control} />
            <InputField name="licenseNumber" label="Номер" control={form.control} />
            <DatePicker name="licenseIssueDate" label="Дата выдачи" control={form.control} />
          </div>
          <InputField name="snils" label="СНИЛС" control={form.control} />

          <div className="flex gap-4">
            <Button type="button" variant="outline">
              Добавить
            </Button>
            <Button type="button" variant="destructive">
              Удалить
            </Button>
            <Button type="submit">OK</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

function InputField({ name, label, control }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DatePicker({ name, label, control }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mr-4">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={'outline'}>
                  {field.value ? format(field.value, 'PPP', { locale: ru }) : 'Выберите дату'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                locale={ru}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
