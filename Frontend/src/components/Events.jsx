import React, { useState } from "react";
import Event1 from "./Events/Event1";
import Event2 from "./Events/Event2";
import Event3 from "./Events/Event3";

// Main Events Component with internal navigation
export default function Events() {
  const [currentStep, setCurrentStep] = useState('event1');
  const [eventData, setEventData] = useState({});

  const navigateToStep = (step, data = {}) => {
    setEventData(prevData => ({ ...prevData, ...data }));
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'event1':
        return <Event1 onNavigate={navigateToStep} />;
      case 'event2':
        return <Event2 onNavigate={navigateToStep} eventData={eventData} />;
      case 'event3':
        return <Event3 eventData={eventData} />;
      default:
        return <Event1 onNavigate={navigateToStep} />;
    }
  };

  return renderCurrentStep();
}
