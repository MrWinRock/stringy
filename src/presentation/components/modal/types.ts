export interface ModalProps {
  isShow: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}
