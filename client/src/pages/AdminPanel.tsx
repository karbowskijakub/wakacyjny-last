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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts, postPost } from "@/api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import CardOffer from "@/components/CardOffer";

// Form validation schema using Zod
const formSchema = z.object({
  persons: z
    .string()
    .regex(/^\d+$/, { message: "Pole musi zawierać tylko cyfry." })
    .length(1, { message: "Pole musi mieć dokładnie jedną cyfrę." }),
});

const AdminPanel = () => {
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

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  // Submit handler for the form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length === 0) {
      toast.error("Proszę wybrać plik.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('HolidayImage', files[0]); 
      formData.append('persons', values.persons);
      mutation.mutate(formData);
    } catch (error) {
      console.error("Błąd podczas przesyłania pliku:", error);
      toast.error("Błąd podczas przesyłania pliku.");
    }
  }

  return (
    <section className="h-full w-full">
      <Dialog>
        <div className="flex justify-center">
          <DialogTrigger asChild>
            <Button>Dodaj post</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodawanie postu</DialogTitle>
            <DialogDescription>
            </DialogDescription>
              <FileUpload onChange={handleFileUpload} />
           
            <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Persons field */}
                  <FormField
                    control={form.control}
                    name="persons"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Ilość osób:" {...field} />
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

  <div className="w-full h-full" >
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts: {error.message}</p>
        ) : (
          <div className="flex-col  w-full h-10 ">
            {posts?.map((post) => (
              <CardOffer key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      

      

    </section>
  );
};

export default AdminPanel;
