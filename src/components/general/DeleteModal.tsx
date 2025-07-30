import { Modal, ModalBody, ModalContent } from "@heroui/react";
import DashboardButton from "./dashboard/DashboardButton";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleDelete?: () => void;
}

export default function DeleteModal({
  isOpen,
  onOpenChange,
  handleDelete,
}: DeleteModalProps) {
  const { t } = useTranslation("header");
  return (
    <>
      <Modal
        className="max-w-[375px]"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="flex flex-col items-center gap-3 py-8 ">
                <img
                  src="/images/deleteModal.png"
                  alt="Warning"
                  className="w-[90px] h-[110px] mb-4"
                />
                <h4 className="font-bold text-2xl">{t('confirmDeletion')}</h4>
                <p className="opacity-60 mb-4">{t('areYouSure')}</p>
                <DashboardButton titleAr="تأكيد" titleEn="Confirm" onClick={handleDelete} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
