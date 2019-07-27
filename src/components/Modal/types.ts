import { ReactNode } from 'react';

export interface ModalProps {
  title?: string;
  isActive: boolean;
  onCancel: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  children?: ReactNode;
}
