'use client';

import { CalendarIcon, UsersIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
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
  groupNumber: z.string().min(1, 'Введите номер группы').regex(/^\d+$/, 'Только цифры'),
  category: z.enum(['A', 'B'], { required_error: 'Выберите категорию' }),
  startTrainingDate: z.date({ required_error: 'Укажите дату начала' }),
  endTrainingDate: z.date({ required_error: 'Укажите дату окончания' }),
  theoryTeacher: z.enum(['Вялков'], { required_error: 'Выберите преподавателя' }),
  practiceTeacher: z.enum(['Вялков', 'Теплов', 'Холодов'], {
    required_error: 'Выберите преподавателя',
  }),
});

export default function FormCreationTrainingGroup() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupNumber: '',
      category: 'B',
      theoryTeacher: 'Вялков',
      practiceTeacher: 'Вялков',
    },
  });

  function onSubmit(values) {
    if (values.endTrainingDate < values.startTrainingDate) {
      toast({ variant: 'destructive', description: 'Дата окончания не может быть раньше начала.' });
      return;
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="groupNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер группы</FormLabel>
              <FormControl>
                <Input placeholder="Введите номер" {...field} />
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
              <FormLabel>Категория</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
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

        <div className="grid grid-cols-2 gap-4">
          {['startTrainingDate', 'endTrainingDate'].map((name, index) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{index === 0 ? 'Дата начала' : 'Дата окончания'}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? format(field.value, 'PPP', { locale: ru })
                            : 'Выберите дату'}
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
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['theoryTeacher', 'practiceTeacher'].map((name, index) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {index === 0 ? 'Преподаватель (теория)' : 'Преподаватель (практика)'}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите преподавателя" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {name === 'theoryTeacher' ? (
                        <SelectItem value="Вялков">Вялков</SelectItem>
                      ) : (
                        <>
                          <SelectItem value="Вялков">Вялков</SelectItem>
                          <SelectItem value="Теплов">Теплов</SelectItem>
                          <SelectItem value="Холодов">Холодов</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full">
          Создать группу
        </Button>
      </form>
    </Form>
  );
}
