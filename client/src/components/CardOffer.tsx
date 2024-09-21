import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts, postPost } from "@/api/api";
import { toast } from "react-toastify";
import { useState } from "react";

interface Post {
  id: string;
  holidayImage: string;
  numberOfPerson: number;
}

const CardOffer = ({ post }: { post: Post }) => {
  const formSchema = z.object({
    persons: z
      .string()
      .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." })
      .length(1, { message: "Pole musi mieć dokładnie jedną cyfrę." }),
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const [loginAttempts, setLoginAttempts] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      persons: "",
    },
  });

  // Convert the uploaded file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Mutation using react-query for form submission
  const mutation = useMutation({
    mutationFn: postPost,
    onSuccess: (data) => {
      console.log("Dodawanie posta powiodło się:", data);
      setLoginAttempts(0);
      toast.success("Post został dodany pomyślnie!");
    },
    onError: (error: Error) => {
      console.error("Błąd podczas dodawania posta:", error);
      toast.error("Błąd podczas dodawania posta. Spróbuj ponownie.");
      setLoginAttempts((prev) => prev + 1);
    },
  });

  // Submit handler for the form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length === 0) {
      toast.error("Proszę wybrać plik.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("HolidayImage", files[0]);
      formData.append("persons", values.persons);
      mutation.mutate(formData);
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
      toast.error("Błąd podczas przesyłania pliku.");
    }
  }

  return (
<Dialog>
  <div className="min-w-full ">
    <DialogTrigger asChild>
      <div className="mt-4">
        <div className="rounded-lg bg-white w-full shadow-md flex flex-row  relative">
          <div className="w-1/2 flex justify-center flex-col items-center ">
            <img
              src={`data:image/jpeg;base64,${post.holidayImage}`}
              alt="Holiday"
              className="h-64 w-64 object-cover rounded"
            />
            <div className="flex justify-center items-center">
            <p>Grecja - Kreta - Istro</p>
          </div>
          <div className="absolute bottom-5 right-5">
          <p>Oferta dodana:</p>
          <p>13:37 14.09.2024</p>
          </div>
          </div>
          <div className="w-1/2 p-4 relative">
          <div className="absolute top-5 right-5">
            <p>Oferta zwykła</p>
          </div>
            <p >
             Oferta dla: {post.numberOfPerson} osób
            </p>
            <p >
             Cena za osobę: 3000 zł
            </p>
            <p >
             Miasto wylotu: Gdańsk
            </p>
            <p>Od 20.09.2024 do 27.09.2024</p>
            <p>Standard hotelu:</p>
            <p>Wyżywienie: Allinclusive</p>
            <p>Link: https://www.itaka.pl/wczasy/grecja</p>
            <p>Opinie google: 4,4/5</p>
            <p>Opinie tripadvisor: 4,4/5</p>
            <p>Opinie z linku: 4/5</p>
            <p>Komentarz: brak</p>
          </div>
        </div>
      </div>
    </DialogTrigger>
  </div>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dodawanie postu</DialogTitle>
      <DialogDescription></DialogDescription>
      <div className="h-30 flex w-full items-center justify-center">
        <div className="relative h-32 w-32">
          <div>
            <button className="absolute right-0 top-0 pointer z-2">
              <Trash2 />
            </button>
          </div>
          <img
            className="h-full w-full object-cover z-0 rounded"
            src={`data:image/jpeg;base64,${post.holidayImage}`}
            alt="Holiday"
          />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="persons"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Ilość osób:"
                    {...field}
                    value={post.numberOfPerson}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Dodawanie..." : "Dodaj post"}
          </Button>
        </form>
      </Form>
    </DialogHeader>
  </DialogContent>
</Dialog>

  );
};

export default CardOffer;
