import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { Category } from './types';
import { UseFormReturn } from 'react-hook-form';

type CustomFormPropsType = {
  onSubmit: (values: any) => void;
  form: UseFormReturn;
};

export default function CustomForm({ onSubmit, form }: CustomFormPropsType) {
  const { control, handleSubmit, watch, setValue } = form;

  const includeEmail = watch('includeEmail');
  const category = watch('category');
  const includeFile = watch('includeFile');
  const file = watch('file');
  console.log('file', file);

  useEffect(() => {
    if (category === 'Fire') {
      setValue('includeEmail', true);
    }
  }, [category]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Fistname */}
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        {/* Lastname */}
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        {/* email option */}
        <FormField
          control={control}
          name="includeEmail"
          render={({ field }) => (
            <FormItem className="space-y-4 space-x-2">
              <FormLabel>Include Email?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={category === 'Fire'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email */}
        {includeEmail && ( // Conditionally render the email field
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* select category */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* watername */}
        {category === 'Water' && (
          <FormField
            control={control}
            name="waterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Watername</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        )}
        {/* Air name */}
        {category === 'Air' && (
          <FormField
            control={control}
            name="airName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Airname</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        )}
        {/* include file? */}
        <FormField
          control={control}
          name="includeFile"
          render={({ field }) => (
            <FormItem className="space-y-4 space-x-2">
              <FormLabel>Include File?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={category === 'Fire'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* File */}
        {includeFile && ( // Conditionally render the file field
          <FormField
            control={control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files && event.target.files[0]
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="pt-4">
          <Button type="submit" className="">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
