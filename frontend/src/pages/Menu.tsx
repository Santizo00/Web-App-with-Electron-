import { useEffect, useState } from 'react';

export default function Menu() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour >= 5 && hour < 12) return "¡Buenos días!";
    else if (hour >= 12 && hour < 19) return "¡Buenas tardes!";
    else return "¡Buenas noches!";
  };

  const formatDate = () =>
    currentDate.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = () => {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-8 rounded-xl shadow-xl w-full mx-4 text-center">
        <h1 className="text-4xl font-bold mb-3">{getGreeting()}</h1>
        <h2 className="text-2xl font-semibold mb-5">¡Que tengas un excelente día!</h2>
        <div className=" inline-block bg-blue-800 px-6 py-2 rounded-full text-lg font-medium">
          {formatDate()} - {formatTime()}
        </div>
      </div>
    </div>
  );
}
