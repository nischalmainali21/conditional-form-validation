import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "./types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BaseData = {
  firstName: string;
  lastName: string;
  category: Category;
};

type EmailData = BaseData &
  (
    | {
        includeEmail: false;
      }
    | {
        includeEmail: true;
        email: string;
      }
  );

type CategoryData = EmailData &
  (
    | {
        category: Category.Fire;
        includeEmail: true;
        email: string;
      }
    | {
        category: Category.Water;
        waterName: string;
      }
    | {
        category: Category.Air;
        airName: string;
      }
  );

type FileData = CategoryData &
  (
    | {
        includeFile: true;
        file: File;
      }
    | {
        includeFile: false;
      }
  );

type Data = FileData;

const baseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const withoutEmailSchema = baseSchema.extend({
  includeEmail: z.literal(false).default(false),
});

const withEmailSchema = baseSchema.extend({
  includeEmail: z.literal(true),
  email: z.string().email(),
});

const firstSchema = z.discriminatedUnion("includeEmail", [withoutEmailSchema, withEmailSchema]);

const FireSchema = baseSchema.extend({
  category: z.literal(Category.Fire),
  includeEmail: z.literal(true),
  email: z.string().email(),
});

const WaterSchema = baseSchema.extend({
  category: z.literal(Category.Water),
  waterName: z.string(),
});

const AirSchema = baseSchema.extend({
  category: z.literal(Category.Air),
  airName: z.string(),
});

const CategorySchema = z.discriminatedUnion("category", [FireSchema, WaterSchema, AirSchema]);

const withoutFileSchema = baseSchema.extend({
  includeFile: z.literal(false).default(false),
});

const withFileSchema = baseSchema.extend({
  includeFile: z.literal(true),
  file: z.instanceof(File, { message: "Upload a valid file" }),
});

const FileSchema = z.discriminatedUnion("includeFile", [
  withoutFileSchema.passthrough(),
  withFileSchema.passthrough(),
]);

const testSchema = [baseSchema, firstSchema, FileSchema, CategorySchema];

const schema = z.custom<Data>().superRefine((data, ctx) => {
  testSchema.forEach((schema) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach(ctx.addIssue);
    }
  });
});

const FormSchema = schema;

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function MultipleDiscriminatedValue() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    // Problem with default values, as not all fields can have the default values
    // This will result in the following warning.
    // A component is changing an uncontrolled input to be controlled.
    defaultValues: {
      firstName: "",
      lastName: "",
      includeEmail: false,
      category: undefined,
      includeFile: false,
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
  }

  const { control, handleSubmit, watch, setValue } = form;

  const includeEmail = watch("includeEmail");
  const category = watch("category");
  const includeFile = watch("includeFile");

  return (
    <div>
      Multi Discriminated Value
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
                    disabled={category === "Fire"}
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
                    <Input placeholder="email@example.com" {...field} type="email" />
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
                <Select
                  onValueChange={(value) => {
                    if (value == "Fire") {
                      setValue("includeEmail", true, { shouldValidate: true });
                    }
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
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
          {category === "Water" && (
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
          {category === "Air" && (
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
                    // disabled={category === "Fire"}
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
                        field.onChange(event.target.files && event.target.files[0])
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
    </div>
  );
}
