import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { data } from './data';
import AccordionItem from './components/Accordion';

function App() {
  return (
    <div className="accordion">
      {data.map((item) => (
        <AccordionItem key={item.id} title={item.title} text={item.text} />
      ))}
    </div>
  );
}

export default App;
