import mongoose from 'mongoose';

const applicationJourneySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  universityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'University', 
    required: true 
  },
  programName: { type: String }, // e.g., "MS Computer Science"
  
  // Matches the progress bar on the dashboard
  status: { 
    type: String, 
    enum: ['Discovery', 'Shortlisted', 'Applying', 'Loan Approved'],
    default: 'Shortlisted'
  },
  
  // Drives the "Action Items" box (e.g., "Upload IELTS Score")
  pendingActions: [{
    title: { type: String },
    description: { type: String },
    isUrgent: { type: Boolean, default: false }, // Triggers the red alert box
    dueDate: { type: Date }
  }]
}, { timestamps: true });

export default mongoose.model('ApplicationJourney', applicationJourneySchema);
4. The LoanSimulation Model
This powers the "Financial Tools" page. Saving these simulations allows users to return to their configured EMI calculations later.

File: models/LoanSimulation.js

JavaScript
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

export default mongoose.model('LoanSimulation', loanSimulationSchema);