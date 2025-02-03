'use client';

import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  groupNumber: z
    .string()
    .regex(/^\d+$/, {
      message: 'Номер группы должен содержать только цифры.',
    })
    .min(1, {
      message: 'Номер группы должен содержать хоть одну цифру.',
    }),
  category: z.enum(['A', 'B'], {
    required_error: 'Выберите категорию.',
  }),
  startTrainingDates: z.date({
    required_error: 'Обязательное поле для заполнения.',
  }),
  endTrainingDates: z.date({
    required_error: 'Обязательное поле для заполнения.',
  }),
  theoryTeachers: z.enum(['Вялков'], {
    required_error: 'Выберите категорию.',
  }),
  practiceTeachers: z.enum(['Вялков', 'Теплов', 'Холодов'], {
    required_error: 'Выберите категорию.',
  }),
});

export default function FormCreationTrainingGroup() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupNumber: '',
      category: 'B',
      theoryTeachers: 'Вялков',
      practiceTeachers: 'Вялков',
    },
  });

  function onSubmit(values) {
    const { startTrainingDates, endTrainingDates } = values;

    if (endTrainingDates && startTrainingDates && endTrainingDates < startTrainingDates) {
      toast({
        variant: 'destructive',
        description: 'Дата конца курса не может быть раньше даты начала курса.',
      });
      return;
    }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="groupNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер новой группы</FormLabel>
                <FormControl>
                  <Input placeholder="введите номер" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите категорию</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="startTrainingDates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата начала курса</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ru })
                        ) : (
                          <span>Выбрать дату</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ru}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTrainingDates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата конца курса</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ru })
                        ) : (
                          <span>Выбрать дату</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ru}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="theoryTeachers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выбрать преподавателей учебных предметов</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Вялков">Вялков С. В.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="practiceTeachers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выбрать преподавателей практических навыков</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Вялков">Вялков С. В.</SelectItem>
                    <SelectItem value="Теплов">Теплов С. В.</SelectItem>
                    <SelectItem value="Холодов">Холодов С. В.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Создать новую группу</Button>
      </form>
    </Form>
  );
}
