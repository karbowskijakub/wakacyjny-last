import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ConfirmEmail = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <section className="flex h-screen w-full items-center justify-center bg-primary">
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb:6 text-3xl font-bold text-primary-foreground no-underline lg:mb-8 lg:text-6xl">
            Wakacyjny<span className="text-customYellow">Last</span>
          </h1>
          <h1 className="mb:3 text-xl text-primary-foreground lg:mb-6 lg:text-3xl">
            Email został potwierdzony.
          </h1>

          <Button
            className="rounded-md"
            size="sm"
            type="button"
            variant="additionalMethod"
            onClick={handleLoginClick}
          >
            <span className="w-full text-center">Zaloguj się</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmEmail;
