import mongoose from 'mongoose';

const loanSimulationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  universityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'University'
  },
  
  // Inputs from the "EMI Simulator"
  loanAmount: { type: Number, required: true }, // e.g., 45000
  tenureYears: { type: Number, required: true }, // e.g., 10
  moratoriumMonths: { type: Number, required: true }, // e.g., 24
  
  // Pre-approval state
  isPreApproved: { type: Boolean, default: false },
  preApprovedUpTo: { type: Number }, // e.g., 40000
  
  // Checklist for documents
  documents: {
    passport: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
    acceptanceLetter: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' },
    coApplicantPan: { type: String, enum: ['Pending', 'Verified'], default: 'Pending' }
  }
}, { timestamps: true });

const LoanSimulation = mongoose.model('LoanSimulation', loanSimulationSchema);

export default LoanSimulation;