
import React, { useContext } from 'react';
import { LogoCard } from '../components/LogoCard';
import { BANKS, PAYMENT_METHODS } from '../constants';
import { UIContext } from '../App';
import { UIContextType } from '../types';

export const HomePage: React.FC = () => {
  const { searchQuery } = useContext(UIContext) as UIContextType;

  // Filter Logic
  const filteredBanks = BANKS.filter(bank => 
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPayments = PAYMENT_METHODS.filter(pm => 
    pm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-8">
      {/* Hero / Intro */}
      <div className="py-12 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white mb-2">Libyan Banking Assets</h1>
        <p className="text-zinc-400 max-w-2xl">
          A centralized repository of vector logos and brand assets for Libyan banks and payment services. 
          Optimized for designers and developers.
        </p>
      </div>

      {/* Banks Section */}
      <section className="py-10">
        <div className="flex items-center gap-3 mb-6">
           <h2 className="text-lg font-semibold text-white">Bank Logos</h2>
        </div>
        
        {filteredBanks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBanks.map(bank => (
              <LogoCard key={bank.id} item={bank} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl">
             <p className="text-zinc-500">No banks found matching "{searchQuery}"</p>
          </div>
        )}
      </section>

      {/* Payment Methods Section */}
      <section className="py-10">
        <div className="flex items-center gap-3 mb-6">
           <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
        </div>

        {filteredPayments.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredPayments.map(pm => (
              <LogoCard key={pm.id} item={pm} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-zinc-800 rounded-xl">
             <p className="text-zinc-500">No payment methods found matching "{searchQuery}"</p>
          </div>
        )}
      </section>
    </div>
  );
};
