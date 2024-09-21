// src/components/Sidebar.tsx
import { PanelsTopLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/menu';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { Link } from 'react-router-dom';

const Sidebar = () =>  {
  // Retrieve the state and setter function from the custom hook
  const { isOpen, setIsOpen } = useSidebarToggle();

  return (

    <aside
      className={cn(
        'z-20  transition-[width] ease-in-out duration-300 w-96 py-5 '
    
      )}
    >

      <div className="relative rounded-md  flex flex-col px-3 py-3 overflow-y-auto shadow-md dark:shadow-zinc-800 ">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            !isOpen ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <PanelsTopLeft className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                !isOpen ? '-translate-x-96 opacity-0 hidden' : 'translate-x-0 opacity-100'
              )}
            >
              WakacyjnyLast
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen}  />
      </div>
    </aside>


  );
}
export default Sidebar;