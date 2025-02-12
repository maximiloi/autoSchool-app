'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  companyName: z.string().min(2, 'Введите название компании'),
  shortName: z.string().min(2, 'Введите краткое название'),
  license: z.string().min(2, 'Введите номер лицензии'),
  inn: z.string().length(10, 'ИНН должен содержать 10 цифр'),
  kpp: z.string().length(9, 'КПП должен содержать 9 цифр'),
  ogrn: z.string().length(13, 'ОГРН должен содержать 13 цифр').optional().or(z.literal('')),
  legalAddress: z.string().min(5, 'Введите юридический адрес'),
  actualAddress: z.string().min(5, 'Введите фактический адрес'),
  region: z.string().min(2, 'Введите регион'),
  bank: z.string().min(2, 'Введите название банка'),
  account: z.string().length(20, 'Расчетный счет должен содержать 20 цифр'),
  bik: z.string().length(9, 'БИК должен содержать 9 цифр'),
  correspondentAccount: z.string().length(20, 'Корр. счет должен содержать 20 цифр'),
  directorSurname: z.string().min(2, 'Введите фамилию директора'),
  directorName: z.string().min(2, 'Введите имя директора'),
  directorPatronymic: z.string().min(2, 'Введите отчество директора'),
  accountantSurname: z.string().min(2, 'Введите фамилию бухгалтера'),
  accountantName: z.string().min(2, 'Введите имя бухгалтера'),
  accountantPatronymic: z.string().min(2, 'Введите отчество бухгалтера'),
  phone: z.string().min(10, 'Введите телефон'),
  email: z.string().email('Введите корректный email'),
  website: z.string().url('Введите корректный URL'),
});

export default function CompanyForm() {
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchCompany() {
      if (!session?.user?.companyId) return;
      try {
        const response = await fetch(`/api/company/${session.user.companyId}`);
        if (response.ok) {
          const companyData = await response.json();
          form.reset(companyData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных компании', error);
        toast({
          duration: 2000,
          variant: 'destructive',
          description: 'Ошибка при загрузке данных компании',
        });
      }
    }
    fetchCompany();
  }, [session, form]);

  async function onSubmit(values) {
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log('Данные успешно обновлены в БД');
        toast({
          duration: 2000,
          description: 'Данные успешно обновлены в БД',
        });
      } else {
        console.error('Ошибка при обновлении данных в БД');
        toast({
          duration: 2000,
          variant: 'destructive',
          description: 'Ошибка при обновлении данных в БД',
        });
      }
    } catch (error) {
      console.error('Ошибка запроса', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Section title="Основная информация">
          <InputField name="companyName" label="Название компании" control={form.control} />
          <InputField name="shortName" label="Краткое название" control={form.control} />
          <InputField name="license" label="Номер лицензии" control={form.control} />
        </Section>

        <Section title="Юридические данные">
          <InputField name="inn" label="ИНН" control={form.control} />
          <InputField name="kpp" label="КПП" control={form.control} />
          <InputField name="ogrn" label="ОГРН" control={form.control} />
        </Section>

        <Section2 title="Адреса">
          <InputField name="legalAddress" label="Юридический адрес" control={form.control} />
          <InputField name="actualAddress" label="Фактический адрес" control={form.control} />
        </Section2>

        <Section title="Банковские реквизиты">
          <InputField name="region" label="Регион" control={form.control} />
          <InputField name="bank" label="Банк" control={form.control} />
          <InputField name="account" label="Расчетный счет" control={form.control} />
          <InputField name="bik" label="БИК" control={form.control} />
          <InputField
            name="correspondentAccount"
            label="Корреспондентский счет"
            control={form.control}
          />
        </Section>

        <Section title="Директор">
          <InputField name="directorSurname" label="Фамилия" control={form.control} />
          <InputField name="directorName" label="Имя" control={form.control} />
          <InputField name="directorPatronymic" label="Отчество" control={form.control} />
        </Section>

        <Section title="Бухгалтер">
          <InputField name="accountantSurname" label="Фамилия" control={form.control} />
          <InputField name="accountantName" label="Имя" control={form.control} />
          <InputField name="accountantPatronymic" label="Отчество" control={form.control} />
        </Section>

        <Section title="Контакты">
          <InputField name="phone" label="Телефон" control={form.control} />
          <InputField name="email" label="Email" control={form.control} />
          <InputField name="website" label="Сайт" control={form.control} />
        </Section>

        <Button className="w-full" type="submit">
          Сохранить или обновить
        </Button>
      </form>
    </Form>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  );
}

function Section2({ title, children }) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
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
