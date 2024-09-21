import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ConfirmEmail = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <section className="h-screen w-full flex justify-center items-center bg-primary">
            <div>
                <div className='flex justify-center items-center flex-col'>
                <h1 className="text-3xl lg:text-6xl font-bold text-primary-foreground no-underline mb:6 lg:mb-8">
        Wakacyjny<span className="text-customYellow">Last</span>
      </h1>
                <h1 className='text-xl lg:text-3xl mb:3 lg:mb-6 text-primary-foreground '>Email został potwierdzony.</h1>
                
                <Button
                    className="rounded-md"
                    size="sm" 
                    type="button"
                    variant="additionalMethod"
                    onClick={handleLoginClick}
                >

                    <span className="w-full text-center">
                        Zaloguj się
                    </span>
                </Button>
                </div>
            </div>
        </section>
    );
};

export default ConfirmEmail;