import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const NavbarRigth: React.FC = () => {
  const currentDate = new Date();
  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }
  
    return (
      <div className="w-72 bg-zinc-950 h-60 max-w-md mx-auto mr-6">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-bold">{format(currentDate, 'MMMM yyyy', { locale: ptBR })}</span>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dayOfWeek, index) => (
          <div key={index} className="font-semibold">{dayOfWeek}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-2 cursor-pointer ${isToday(day) ? 'bg-white text-black' : 'text-gray-600'} rounded`}
          >
            {format(day, 'd', { locale: ptBR })}
          </div>
        ))}
      </div>
    </div>
    );
  };
  
  export default NavbarRigth;