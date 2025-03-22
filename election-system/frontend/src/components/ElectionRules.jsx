import React from 'react';

const ElectionRules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10  mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
        College Election Rules and Guidelines
      </h1>

      <div className="mb-6 bg-gray-800 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">1. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Only registered students with a valid college ID are eligible to vote.</li>
            <li>Voters will receive a unique passkey via email for authentication.</li>
            <li>Only students from the relevant year, stream, or department can vote for their representatives.</li>
          </ul>
        </div>
      </div>

      <div className="mb-6 bg-gray-800 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">2. Voting Process</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Voting will be conducted online through the official election portal.</li>
            <li>Each voter must authenticate using their passkey and OTP verification.</li>
            <li>Votes are cast anonymously and securely stored in the system.</li>
          </ul>
        </div>
      </div>

      <div className="mb-6 bg-gray-800 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">3. Candidate Guidelines</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Candidates must submit their nomination form before the deadline.</li>
            <li>False information in the form will lead to disqualification.</li>
            <li>Campaigning activities must adhere to college guidelines.</li>
          </ul>
        </div>
      </div>

      <div className="mb-6 bg-gray-800 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">4. Security and Integrity</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Duplicate or fraudulent voting is strictly prohibited.</li>
            <li>Any attempt to manipulate votes will result in disqualification.</li>
            <li>The election committee reserves the right to investigate and take action against violations.</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">5. Results and Transparency</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Results will be displayed in real-time on the election portal.</li>
            <li>Votes are encrypted and securely stored to maintain confidentiality.</li>
            <li>The final results will be announced by the election committee.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElectionRules;