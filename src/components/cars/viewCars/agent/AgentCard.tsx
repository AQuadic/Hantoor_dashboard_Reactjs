import CallIcon from "@/components/icons/cars/CallIcon";
import GoogleMapsIcon from "@/components/icons/cars/GoogleMapsIcon";
import WhatsappIcon from "@/components/icons/cars/WhatsappIcon";
import React from "react";

interface AgentCardProps {
  title: string;
  description: string;
}

const AgentCard = ({ title, description }: AgentCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <GoogleMapsIcon />
        <WhatsappIcon />
        <CallIcon />
      </div>
    </div>
  );
};

export default AgentCard;
