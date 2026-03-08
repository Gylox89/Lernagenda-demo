import React from 'react';
import Modal from './Modal';

interface CompetenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompetenceModal: React.FC<CompetenceModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Handlungskompetenz"
      size="md"
    >
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🛠️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">In Entwicklung</h3>
        <p className="text-gray-600">
          Diese Funktion wird aktuell entwickelt und steht bald zur Verfügung.
        </p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Verstanden
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CompetenceModal;