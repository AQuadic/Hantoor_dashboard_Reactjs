import CallIcon from "@/components/icons/cars/CallIcon";
import GoogleMapsIcon from "@/components/icons/cars/GoogleMapsIcon";
import WhatsappIcon from "@/components/icons/cars/WhatsappIcon";
import React from "react";

interface AgentCardProps {
  title: string;
  description: string;
  phone?: string | null;
  mapLink?: string | null;
}

const AgentCard = ({ title, description, phone, mapLink }: AgentCardProps) => {
  const handlePhoneCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (phone) {
      const cleanedPhone = phone.replace(/[^0-9+]/g, "");
      window.open(`https://wa.me/${cleanedPhone}`, "_blank");
    }
  };

  const handleMapOpen = () => {
    if (mapLink) {
      window.open(mapLink, "_blank");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {mapLink && (
          <button
            onClick={handleMapOpen}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Open Google Maps"
          >
            <GoogleMapsIcon />
          </button>
        )}
        {phone && (
          <>
            <button
              onClick={handleWhatsApp}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Open WhatsApp"
            >
              <WhatsappIcon />
            </button>
            <button
              onClick={handlePhoneCall}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Call Phone"
            >
              <CallIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
