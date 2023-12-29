import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function AccordionItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, text } = props;

  const handleAccordionVisible = () => setIsOpen((s) => !s);

  return (
    <div className={`accordion-item ${isOpen && 'accordion__expanded'}`}>
      <div className="accordion-item__header" onClick={handleAccordionVisible}>
        {title}
        <ChevronDownIcon className="accordion-item__chevron " />
      </div>
      <div className="accordion-item__content">{text}</div>
      <br />
    </div>
  );
}

export default AccordionItem;
