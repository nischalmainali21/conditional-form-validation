import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const baseSchema = z.object({
  firstName: z.string().min(1, "cannot be empty"),
  lastName: z.string().min(1, "cannot be empty"),
});

const withoutEmailSchema = baseSchema.extend({
  includeEmail: z.literal(false).default(false),
});

const withEmailSchema = baseSchema.extend({
  includeEmail: z.literal(true),
  email: z.string().email(),
});

const finalSchema = z.discriminatedUnion("includeEmail", [withoutEmailSchema, withEmailSchema]);

const FormSchema = finalSchema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function FirstExample() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      includeEmail: false,
    },
  });

  const { control, handleSubmit, watch, reset } = form;

  const includeEmail = watch("includeEmail");

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

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
        {/* option */}
        <FormField
          control={control}
          name="includeEmail"
          render={({ field }) => (
            <FormItem className="space-y-4 space-x-2">
              <FormLabel>Include Email?</FormLabel>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="pt-4 flex gap-4">
          <Button type="submit" className="">
            Submit
          </Button>
          <Button type="reset" className="" variant={"secondary"} onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
