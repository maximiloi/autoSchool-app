import { FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';

export default function InputField({ name, label, control }) {
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
