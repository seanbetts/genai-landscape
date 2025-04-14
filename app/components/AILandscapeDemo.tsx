'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import landscapeData from '@/data/landscape.json';

const LandscapeVisualization = ({ data, onCompanySelect }) => {
  // Group companies by category
  const categorizedCompanies = {
    frontier: data.companies.filter(company => company.category === 'frontier'),
    open: data.companies.filter(company => company.category === 'open'),
    enterprise: data.companies.filter(company => company.category === 'enterprise'),
    image: data.companies.filter(company => company.category === 'image'),
    video: data.companies.filter(company => company.category === 'video'),
    music: data.companies.filter(company => company.category === 'music'),
    other: data.companies.filter(company => company.category === 'other')
  };

  // Category styling
  const categoryStyles = {
    frontier: 'bg-blue-50 border-blue-200',
    open: 'bg-green-50 border-green-200',
    enterprise: 'bg-purple-50 border-purple-200',
    image: 'bg-yellow-50 border-yellow-200',
    video: 'bg-red-50 border-red-200',
    music: 'bg-pink-50 border-pink-200',
    other: 'bg-gray-50 border-gray-200'
  };

  // Category labels
  const categoryLabels = {
    frontier: 'FRONTIER MODELS',
    open: 'OPEN MODELS',
    enterprise: 'ENTERPRISE PLATFORMS',
    image: 'IMAGE',
    video: 'VIDEO',
    music: 'MUSIC',
    other: 'OTHER'
  };

  // Handle company click
  const handleCompanyClick = (companyId) => {
    if (onCompanySelect) {
      onCompanySelect(companyId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Frontier Models Section */}
      <div className={`rounded-lg border-2 ${categoryStyles.frontier} p-4`}>
        <div className="flex items-center mb-4">
          <div className="text-xl font-bold w-1/6">{categoryLabels.frontier}</div>
          <div className="flex-1 grid grid-cols-4 gap-4">
            {categorizedCompanies.frontier.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="w-full text-center">
                  <div className="relative h-10 w-full mb-2">
                    <Image 
                      src={company.logo || "/images/companies/placeholder.png"} 
                      alt={`${company.name} logo`}
                      className="mx-auto"
                      width={100}
                      height={40}
                      objectFit="contain"
                    />
                  </div>
                  {company.models && company.models.filter(model => model.featured).map((model, idx) => (
                    <div key={model.id} className="text-sm font-medium">
                      {idx === 0 ? model.name : `& ${model.name}`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Two-column layout for Open Models and Enterprise Platforms */}
      <div className="grid grid-cols-2 gap-6">
        {/* Open Models */}
        <div className={`rounded-lg border-2 ${categoryStyles.open} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.open}</div>
          <div className="grid grid-cols-3 gap-4">
            {categorizedCompanies.open.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-10 w-full mb-2">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={100}
                    height={40}
                    objectFit="contain"
                  />
                </div>
                <div className="text-center">
                  {company.models && company.models.filter(model => model.featured).map(model => (
                    <div key={model.id} className="text-sm font-medium">{model.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enterprise Platforms */}
        <div className={`rounded-lg border-2 ${categoryStyles.enterprise} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.enterprise}</div>
          <div className="grid grid-cols-2 gap-4">
            {categorizedCompanies.enterprise.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-10 w-full mb-2">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={100}
                    height={40}
                    objectFit="contain"
                  />
                </div>
                <div className="text-center">
                  {company.models && company.models.filter(model => model.featured).map(model => (
                    <div key={model.id} className="text-sm font-medium">{model.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Four-column layout for specialized categories */}
      <div className="grid grid-cols-4 gap-6">
        {/* Image */}
        <div className={`rounded-lg border-2 ${categoryStyles.image} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.image}</div>
          <div className="space-y-3">
            {categorizedCompanies.image.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-8 w-full mb-1">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    objectFit="contain"
                  />
                </div>
                {company.models && company.models.filter(model => model.featured).slice(0, 1).map(model => (
                  <div key={model.id} className="text-sm">{model.name}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Video */}
        <div className={`rounded-lg border-2 ${categoryStyles.video} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.video}</div>
          <div className="space-y-3">
            {categorizedCompanies.video.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-8 w-full mb-1">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    objectFit="contain"
                  />
                </div>
                {company.models && company.models.filter(model => model.featured).slice(0, 1).map(model => (
                  <div key={model.id} className="text-sm">{model.name}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Music */}
        <div className={`rounded-lg border-2 ${categoryStyles.music} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.music}</div>
          <div className="space-y-3">
            {categorizedCompanies.music.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-8 w-full mb-1">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    objectFit="contain"
                  />
                </div>
                {company.models && company.models.filter(model => model.featured).slice(0, 1).map(model => (
                  <div key={model.id} className="text-sm">{model.name}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Other */}
        <div className={`rounded-lg border-2 ${categoryStyles.other} p-4`}>
          <div className="text-xl font-bold mb-4">{categoryLabels.other}</div>
          <div className="space-y-3">
            {categorizedCompanies.other.map(company => (
              <div 
                key={company.id} 
                className="flex flex-col items-center cursor-pointer hover:opacity-80"
                onClick={() => handleCompanyClick(company.id)}
              >
                <div className="relative h-8 w-full mb-1">
                  <Image 
                    src={company.logo || "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    objectFit="contain"
                  />
                </div>
                {company.models && company.models.filter(model => model.featured).slice(0, 1).map(model => (
                  <div key={model.id} className="text-sm">{model.name}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm mt-4">
        Data last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

const AILandscapeDemo = () => {
  const [data, setData] = useState(landscapeData);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'company', 'model'
  
  // Handle company selection
  const handleCompanySelect = (companyId) => {
    const company = data.companies.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setSelectedModel(null);
      setCurrentView('company');
    }
  };
  
  // Handle model selection
  const handleModelSelect = (modelId) => {
    if (!selectedCompany) return;
    
    const model = selectedCompany.models.find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
      setCurrentView('model');
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    if (currentView === 'model') {
      setCurrentView('company');
      setSelectedModel(null);
    } else if (currentView === 'company') {
      setCurrentView('home');
      setSelectedCompany(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div
            className="text-2xl font-bold text-gray-800 cursor-pointer"
            onClick={() => {
              setCurrentView('home');
              setSelectedCompany(null);
              setSelectedModel(null);
            }}
          >
            Generative AI Landscape
          </div>
          
          {currentView !== 'home' && (
            <button 
              onClick={handleBack} 
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Back
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4">
        {currentView === 'home' && (
          <LandscapeVisualization data={data} onCompanySelect={handleCompanySelect} />
        )}
        
        {currentView === 'company' && selectedCompany && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="relative h-16 w-40 mr-4">
                <Image 
                  src={selectedCompany.logo || "/images/companies/placeholder.png"} 
                  alt={`${selectedCompany.name} logo`}
                  fill
                  objectFit="contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{selectedCompany.name}</h1>
                <div className="text-gray-600">
                  <a href={selectedCompany.website} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                    {selectedCompany.website}
                  </a>
                  <span className="mx-2">•</span>
                  <span>Last updated: {selectedCompany.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg mb-8">{selectedCompany.description}</p>
            
            <h2 className="text-2xl font-bold mb-4">Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {selectedCompany.models && selectedCompany.models.map(model => (
                <div 
                  key={model.id}
                  className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleModelSelect(model.id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                  {model.featured && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                  
                  {model.capabilities && (
                    <div className="mt-4 space-y-2">
                      {Object.entries(model.capabilities).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <span className="capitalize w-24 text-sm">{key}:</span>
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div 
                              className="bg-blue-500 h-full rounded-full" 
                              style={{ width: `${(value / 5) * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm">{value}/5</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {selectedCompany.features && (
              <>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedCompany.features.map(feature => (
                    <div key={feature.name} className="border rounded-lg overflow-hidden">
                      <div className="relative h-48 bg-gray-200">
                        <Image 
                          src={feature.image || "/images/companies/placeholder.png"} 
                          alt={feature.name}
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                        <p className="text-gray-700 mb-4">{feature.description}</p>
                        <a 
                          href={feature.url} 
                          target="_blank" 
                          rel="noopener"
                          className="text-blue-600 hover:underline"
                        >
                          Learn more →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {selectedCompany.subscriptions && (
              <>
                <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedCompany.subscriptions.map(subscription => (
                    <div 
                      key={subscription.tier}
                      className={`bg-white p-6 rounded-lg shadow-md ${
                        subscription.type === 'enterprise' ? 'border-2 border-purple-200' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{subscription.tier}</h3>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {subscription.type === 'enterprise' ? 'Enterprise' : 'Consumer'}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        {subscription.price !== null ? (
                          <div className="text-2xl font-bold">
                            ${subscription.price}
                            <span className="text-sm text-gray-500 font-normal">/{subscription.billingCycle}</span>
                            {subscription.perUser && <span className="text-sm text-gray-500 font-normal"> per user</span>}
                          </div>
                        ) : (
                          <div className="text-lg font-medium">Custom pricing</div>
                        )}
                      </div>
                      
                      <ul className="space-y-2">
                        {subscription.features && subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        
        {currentView === 'model' && selectedCompany && selectedModel && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="relative h-12 w-32 mr-4">
                <Image 
                  src={selectedCompany.logo || "/images/companies/placeholder.png"} 
                  alt={`${selectedCompany.name} logo`}
                  fill
                  objectFit="contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{selectedModel.name}</h1>
                <div className="text-gray-600">
                  <span>{selectedCompany.name}</span>
                  <span className="mx-2">•</span>
                  <span>Type: {selectedModel.type || "N/A"}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="inline-flex space-x-2 mb-4">
                {selectedModel.featured && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Model
                  </span>
                )}
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedModel.type || "Unknown type"}
                </span>
              </div>
            </div>
            
            {selectedModel.capabilities && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Capabilities</h2>
                <div className="space-y-4 max-w-2xl">
                  {Object.entries(selectedModel.capabilities).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">{key}</span>
                        <span>{value}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            key === 'intelligence' ? 'bg-blue-500' : 
                            key === 'speed' ? 'bg-yellow-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${(value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedModel.specs && (
              <div>
                <h2 className="text-xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl">
                  {Object.entries(selectedModel.specs).map(([key, value]) => (
                    <div key={key}>
                      <h3 className="font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h3>
                      <div>
                        {Array.isArray(value) ? (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {value.map(item => (
                              <span key={item} className="bg-gray-100 px-2 py-1 rounded text-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : typeof value === 'boolean' ? (
                          value ? "Yes" : "No"
                        ) : typeof value === 'number' ? (
                          value.toLocaleString()
                        ) : (
                          value
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4">
          <p>© 2025 AI Landscape Explorer</p>
        </div>
      </footer>
    </div>
  );
};

export default AILandscapeDemo;