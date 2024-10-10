import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts, postPost } from "@/api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import CardOffer from "@/components/CardOffer";
import DatePickerWithRange from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  numberOfPerson: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." })
    .min(1, { message: "Pole musi mieć przynajmniej jedną cyfrę." }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Podaj poprawną cenę." }),
  cityOfDeparture: z.string().min(1, { message: "Pole nie może być puste." }),
  hotelRating: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." })
    .min(1, { message: "Pole musi mieć przynajmniej jedną cyfrę." }),
  food: z.string().min(1, { message: "Pole nie może być puste." }),
  url: z.string().url({ message: "Podaj poprawny URL." }),
  googleOpinions: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." }),
  tripAdvisorOpinions: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." }),
  travelAgencyOpinions: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." }),
  comments: z.string(),
  isPremium: z.boolean().optional(),
  allDate: z
    .object({
      from: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Data początkowa nie może być pusta.",
      }),
      to: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Data końcowa nie może być pusta.",
      }),
    })
    .refine((data) => data.from < data.to, {
      message: "Data początkowa musi być przed datą końcową.",
    }),
  regionHolidaysName: z
    .string()
    .min(1, { message: "Pole nie może być puste." }),
  cityHolidaysName: z.string().min(1, { message: "Pole nie może być puste." }),
  countryHolidaysName: z
    .string()
    .min(1, { message: "Pole nie może być puste." }),
  hotelHolidaysName: z.string().min(1, { message: "Pole nie może być puste." }),
  travelAgency: z.string().min(1, { message: "Pole nie może być puste." }),
});

const AdminPanel = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfPerson: "",
      price: "",
      cityOfDeparture: "",
      hotelRating: "",
      food: "",
      url: "",
      googleOpinions: "",
      tripAdvisorOpinions: "",
      travelAgencyOpinions: "",
      comments: "",
      allDate: undefined,
      isPremium: false,
      regionHolidaysName: "",
      cityHolidaysName: "",
      countryHolidaysName: "",
      hotelHolidaysName: "",
      travelAgency: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postPost,
    onSuccess: (data) => {
      console.log("Dodawanie posta powiodło się:", data);
      toast.success("Post został dodany pomyślnie!");
      // form.reset(); // Reset the form on success
    },
    onError: (error: Error) => {
      console.error("Błąd podczas dodawania posta:", error);
      toast.error("Błąd podczas dodawania posta. Spróbuj ponownie.");
    },
  });

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting:", values);

    if (files.length === 0) {
      toast.error("Proszę wybrać plik.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("HolidayImage", files[0]);

      if (values.allDate) {
        formData.append("startDate", values.allDate.from.toISOString());
        formData.append("endDate", values.allDate.to.toISOString());
      }

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      mutation.mutate(formData);
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
      toast.error("Błąd podczas przesyłania pliku.");
    }
  }

  return (
    <section className="h-full w-full">
       <ScrollArea className="h-full w-full p-3">
      <Dialog>
        <div className="flex justify-center p-5">
          <DialogTrigger asChild>
            <Button>Dodaj post</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodawanie postu</DialogTitle>
            <DialogDescription></DialogDescription>
            <ScrollArea className="h-[500px] w-full p-3">
              <FileUpload onChange={handleFileUpload} />

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="overflow-y: auto h-32 space-y-8 p-4"
                >
                  <FormField
                    control={form.control}
                    name="numberOfPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Ilość osób" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Cena za osobę" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Od kiedy do kiedy</FormLabel>
                        <FormControl>
                          <DatePickerWithRange
                            {...field}
                            value={field.value}
                            onChange={(range) => {
                              field.onChange(range);
                            }}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cityOfDeparture"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Miasto wylotu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hotelHolidaysName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nazwa hotelu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hotelRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Standard hotelu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="food"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Wyżywienie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="None">Brak</SelectItem>
                              <SelectItem value="BB">
                                Bed & Breakfast
                              </SelectItem>
                              <SelectItem value="HB">Half Board</SelectItem>
                              <SelectItem value="FB">Full Board</SelectItem>
                              <SelectItem value="AI">All Inclusive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regionHolidaysName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Region" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cityHolidaysName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Miasto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="countryHolidaysName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Państwo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="googleOpinions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Opinie Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tripAdvisorOpinions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Opinie Tripadvisor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelAgencyOpinions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Opinie z Linku" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="travelAgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Biuro podróży" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Komentarz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPremium"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mr-4">
                          Czy to oferta premium?:
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Dodaj post</Button>
                </form>
              </Form>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="h-full w-full">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts: {error.message}</p>
        ) : (
          <div className="h-10 w-full flex-col">
            {posts?.map((post) => <CardOffer key={post.id} post={post} />)}
          </div>
        )}
      </div>
      </ScrollArea>
    </section>
  );
};

export default AdminPanel;
