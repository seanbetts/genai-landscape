'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import landscapeData from '@/data/landscape.json';

// Define types based on the JSON structure
interface Feature {
  name: string;
  description: string;
  image: string;
  url: string;
}

interface Specs {
  reasoningTokens?: boolean;
  inputFormats?: string[];
  outputFormats?: string[];
  maxInputTokens?: number;
  maxOutputTokens?: number;
  knowledgeCutoff?: string;
  openSource?: boolean;
  techniques?: string[];
  commercialUseAllowed?: boolean;
  genres?: string[];
  styles?: string[];
  integrated?: string[];
  maxDuration?: string;
  voiceCloning?: boolean;
  emotionControl?: boolean;
  languageSupport?: string[];
  personalityCustomization?: boolean;
  voiceCapabilities?: boolean;
  memoryCapacity?: string;
  realTimeData?: boolean;
  sourceAttribution?: boolean;
  dataRetrieval?: string;
}

interface Capabilities {
  intelligence?: number;
  speed?: number;
  reasoning?: number;
  creativity?: number;
  personality?: number;
  naturalness?: number;
  accuracy?: number;
  codeQuality?: number;
}

interface Model {
  id: string;
  name: string;
  featured?: boolean;
  type?: string;
  releaseDate?: string;
  capabilities?: Capabilities;
  specs?: Specs;
}

interface Subscription {
  tier: string;
  type: string;
  price: number | null;
  billingCycle: string;
  perUser?: boolean;
  features: string[];
}

interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  category: string;
  description: string;
  lastUpdated: string;
  features?: Feature[];
  models: Model[];
  subscriptions?: Subscription[];
}

interface LandscapeData {
  companies: Company[];
}

interface LandscapeVisualizationProps {
  data: LandscapeData;
  onCompanySelect: (companyId: string) => void;
}

const LandscapeVisualization: React.FC<LandscapeVisualizationProps> = ({ data, onCompanySelect }) => {
  // Helper to filter companies with at least one featured model
  const hasFeaturedModel = (company: Company): boolean => {
    return company.models && company.models.some(model => model.featured);
  };

  // Group companies by category (only include those with featured models)
  const categorizedCompanies: Record<string, Company[]> = {
    frontier: data.companies.filter(company => company.category === 'frontier' && hasFeaturedModel(company)),
    open: data.companies.filter(company => company.category === 'open' && hasFeaturedModel(company)),
    enterprise: data.companies.filter(company => company.category === 'enterprise' && hasFeaturedModel(company)),
    image: data.companies.filter(company => company.category === 'image' && hasFeaturedModel(company)),
    video: data.companies.filter(company => company.category === 'video' && hasFeaturedModel(company)),
    music: data.companies.filter(company => company.category === 'music' && hasFeaturedModel(company)),
    other: data.companies.filter(company => company.category === 'other' && hasFeaturedModel(company))
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
  const handleCompanyClick = (companyId: string): void => {
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
                      src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                      alt={`${company.name} logo`}
                      className="mx-auto"
                      width={100}
                      height={40}
                      style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={100}
                    height={40}
                    style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={100}
                    height={40}
                    style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    style={{ objectFit: "contain" }}
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
                    src={company.logo && company.logo.startsWith("/") ? company.logo : "/images/companies/placeholder.png"} 
                    alt={`${company.name} logo`}
                    className="mx-auto"
                    width={80}
                    height={32}
                    style={{ objectFit: "contain" }}
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
    </div>
  );
};

const AILandscapeDemo: React.FC = () => {
  const [data, setData] = useState<LandscapeData>(landscapeData as LandscapeData);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'company'>('home');
  const [expandedSections, setExpandedSections] = useState({
    models: true,
    features: true,
    subscriptions: true
  });
  
  // Handle company selection
  const handleCompanySelect = (companyId: string): void => {
    const company = data.companies.find(c => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setCurrentView('company');
    }
  };
  
  // Handle back navigation
  const handleBack = (): void => {
    if (currentView === 'company') {
      setCurrentView('home');
      setSelectedCompany(null);
    }
  };
  
  // Toggle section expansion
  const toggleSection = (section: 'models' | 'features' | 'subscriptions'): void => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
            }}
          >
            Generative AI Landscape
          </div>
          
          <div>
            {currentView === 'home' && (
              <div className="text-gray-600 text-sm">
                Last updated: {new Date().toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {currentView === 'home' && (
          <LandscapeVisualization data={data} onCompanySelect={handleCompanySelect} />
        )}
        
        {currentView === 'company' && selectedCompany && (
          <div>
            <button 
              onClick={handleBack} 
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <i className="bi bi-arrow-left mr-1"></i> Back to landscape
            </button>
            <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-6">
              <a 
                href={selectedCompany.website} 
                target="_blank" 
                rel="noopener" 
                className="relative block h-20 w-40 hover:opacity-80 transition-opacity"
                title="Visit website"
              >
                <Image 
                  src={selectedCompany.logo && selectedCompany.logo.startsWith("/") ? selectedCompany.logo : "/images/companies/placeholder.png"} 
                  alt={`${selectedCompany.name} logo`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </a>
              <div className="text-gray-600 text-sm">
                Last updated: {
                  new Date(selectedCompany.lastUpdated).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })
                }
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-lg">{selectedCompany.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 
                className="text-2xl font-bold mb-4 flex items-center cursor-pointer"
                onClick={() => toggleSection('models')}
              >
                <i className={`bi ${expandedSections.models ? 'bi-chevron-down' : 'bi-chevron-right'} mr-2 text-blue-600`}></i>
                Models
              </h2>
              
              {selectedCompany.models && selectedCompany.models.length > 0 && expandedSections.models && (
                <div className="flex flex-col">
                <div className="overflow-x-auto w-full">
                  <div style={{ 
                    width: selectedCompany.models.length > 4
                      ? `${(selectedCompany.models.length + 1) * 200}px` // For horizontal scrolling
                      : `${Math.min(100, (selectedCompany.models.length + 1) * 20)}%` // Dynamic width based on model count
                  }}>
                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b sticky left-0 bg-gray-50" style={{ width: '20%', minWidth: '160px' }}></th>
                          {selectedCompany.models.slice(0, 4).map(model => (
                            <th key={model.id} className="py-3 px-4 text-center font-semibold text-gray-700 border-b" style={{ width: '20%', minWidth: '160px' }}>
                              <div className="font-semibold text-gray-900">{model.name}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Release Date Row */}
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b sticky left-0 bg-white">
                            <div className="flex items-center">
                              <i className="bi bi-calendar-date text-blue-600 mr-2"></i> Release Date
                            </div>
                          </td>
                          {selectedCompany.models.slice(0, 4).map(model => (
                            <td key={model.id} className="py-3 px-4 border-b text-center">
                              {model.releaseDate ? (
                                new Date(model.releaseDate).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              ) : "-"}
                            </td>
                          ))}
                        </tr>

                        {/* Type Row */}
                        <tr className="hover:bg-gray-50">
                          <td className="py-3 px-4 border-b sticky left-0 bg-white">
                            <div className="flex items-center">
                              <i className="bi bi-box text-blue-600 mr-2"></i> Type
                            </div>
                          </td>
                          {selectedCompany.models.slice(0, 4).map(model => (
                            <td key={model.id} className="py-3 px-4 border-b text-center">
                              <span className="capitalize">{model.type || "-"}</span>
                            </td>
                          ))}
                        </tr>
                    {/* Intelligence Row */}
                    {selectedCompany.models.some(model => model.capabilities?.intelligence) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-circle-fill text-blue-600 mr-2"></i> Intelligence
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.capabilities?.intelligence ? (
                              <div className="flex items-center justify-center text-blue-600">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={i < (model.capabilities?.intelligence || 0)
                                      ? "bi bi-circle-fill mx-0.5" 
                                      : "bi bi-circle mx-0.5"
                                    }
                                  ></i>
                                ))}
                              </div>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Speed Row */}
                    {selectedCompany.models.some(model => model.capabilities?.speed) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-lightning-charge-fill text-blue-600 mr-2"></i> Speed
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.capabilities?.speed ? (
                              <div className="flex items-center justify-center text-blue-600">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={i < (model.capabilities?.speed || 0)
                                      ? "bi bi-lightning-charge-fill mx-0.5" 
                                      : "bi bi-lightning-charge mx-0.5"
                                    }
                                  ></i>
                                ))}
                              </div>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Reasoning Row */}
                    {selectedCompany.models.some(model => model.capabilities?.reasoning) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-lightbulb-fill text-blue-600 mr-2"></i> Reasoning
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.capabilities?.reasoning ? (
                              <div className="flex items-center justify-center text-blue-600">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={i < (model.capabilities?.reasoning || 0)
                                      ? "bi bi-lightbulb-fill mx-0.5" 
                                      : "bi bi-lightbulb mx-0.5"
                                    }
                                  ></i>
                                ))}
                              </div>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Reasoning Tokens Row */}
                    {selectedCompany.models.some(model => model.specs?.reasoningTokens !== undefined) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-lightbulb text-blue-600 mr-2"></i> Reasoning Tokens
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.specs?.reasoningTokens !== undefined ? (
                              model.specs.reasoningTokens ? "Yes" : "No"
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Creativity Row */}
                    {selectedCompany.models.some(model => model.capabilities?.creativity) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-stars text-blue-600 mr-2"></i> Creativity
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.capabilities?.creativity ? (
                              <div className="flex items-center justify-center text-blue-600">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={i < (model.capabilities?.creativity || 0)
                                      ? "bi bi-stars mx-0.5" 
                                      : "bi bi-star mx-0.5"
                                    }
                                  ></i>
                                ))}
                              </div>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Input Formats Row */}
                    {selectedCompany.models.some(model => model.specs?.inputFormats) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-arrow-down-right-square-fill text-blue-600 mr-2"></i> Input Formats
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            <div className="flex gap-3 justify-center">
                              <i className={`bi bi-file-text-fill text-lg ${model.specs?.inputFormats?.includes("text") ? "text-blue-600" : "text-gray-300"}`} title="Text"></i>
                              <i className={`bi bi-mic-fill text-lg ${model.specs?.inputFormats?.includes("audio") ? "text-blue-600" : "text-gray-300"}`} title="Audio"></i>
                              <i className={`bi bi-image-fill text-lg ${model.specs?.inputFormats?.includes("image") ? "text-blue-600" : "text-gray-300"}`} title="Image"></i>
                              <i className={`bi bi-music-note-beamed text-lg ${model.specs?.inputFormats?.includes("music") ? "text-blue-600" : "text-gray-300"}`} title="Music"></i>
                              <i className={`bi bi-camera-video-fill text-lg ${model.specs?.inputFormats?.includes("video") ? "text-blue-600" : "text-gray-300"}`} title="Video"></i>
                            </div>
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Output Formats Row */}
                    {selectedCompany.models.some(model => model.specs?.outputFormats) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-arrow-up-right-square-fill text-blue-600 mr-2"></i> Output Formats
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            <div className="flex gap-3 justify-center">
                              <i className={`bi bi-file-text-fill text-lg ${model.specs?.outputFormats?.includes("text") ? "text-blue-600" : "text-gray-300"}`} title="Text"></i>
                              <i className={`bi bi-mic-fill text-lg ${model.specs?.outputFormats?.includes("audio") ? "text-blue-600" : "text-gray-300"}`} title="Audio"></i>
                              <i className={`bi bi-image-fill text-lg ${model.specs?.outputFormats?.includes("image") ? "text-blue-600" : "text-gray-300"}`} title="Image"></i>
                              <i className={`bi bi-music-note-beamed text-lg ${model.specs?.outputFormats?.includes("music") ? "text-blue-600" : "text-gray-300"}`} title="Music"></i>
                              <i className={`bi bi-camera-video-fill text-lg ${model.specs?.outputFormats?.includes("video") ? "text-blue-600" : "text-gray-300"}`} title="Video"></i>
                            </div>
                          </td>
                        ))}
                      </tr>
                    )}
                    
                    {/* Max Input Tokens Row */}
                    {selectedCompany.models.some(model => model.specs?.maxInputTokens) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-sign-turn-right-fill text-blue-600 mr-2"></i> Max Input
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.specs?.maxInputTokens ? (
                              <span>{model.specs.maxInputTokens.toLocaleString()} tokens</span>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}

                    {/* Max Output Tokens Row */}
                    {selectedCompany.models.some(model => model.specs?.maxOutputTokens) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-sign-turn-left-fill text-blue-600 mr-2"></i> Max Output
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.specs?.maxOutputTokens ? (
                              <span>{model.specs.maxOutputTokens.toLocaleString()} tokens</span>
                            ) : "-"}
                          </td>
                        ))}
                      </tr>
                    )}

                    {/* Knowledge Cutoff Row */}
                    {selectedCompany.models.some(model => model.specs?.knowledgeCutoff) && (
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b sticky left-0 bg-white">
                          <div className="flex items-center">
                            <i className="bi bi-calendar-check-fill text-blue-600 mr-2"></i> Knowledge Cutoff
                          </div>
                        </td>
                        {selectedCompany.models.slice(0, 4).map(model => (
                          <td key={model.id} className="py-3 px-4 border-b text-center">
                            {model.specs?.knowledgeCutoff || "-"}
                          </td>
                        ))}
                      </tr>
                    )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Format Icons Legend */}
                <div className="mt-4 max-w-lg mx-auto">
                  <div className="flex gap-5 items-center justify-center bg-gray-50 p-3 rounded-lg flex-wrap">
                    <span className="text-sm text-gray-600">Legend:</span>
                    <div className="flex items-center">
                      <i className="bi bi-file-text-fill text-blue-600 mr-1"></i>
                      <span className="text-sm">Text</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-mic-fill text-blue-600 mr-1"></i>
                      <span className="text-sm">Audio</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-image-fill text-blue-600 mr-1"></i>
                      <span className="text-sm">Image</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-music-note-beamed text-blue-600 mr-1"></i>
                      <span className="text-sm">Music</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-camera-video-fill text-blue-600 mr-1"></i>
                      <span className="text-sm">Video</span>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>
            
            {selectedCompany.features && (
              <div className="mb-8">
                <h2 
                  className="text-2xl font-bold mb-4 flex items-center cursor-pointer"
                  onClick={() => toggleSection('features')}
                >
                  <i className={`bi ${expandedSections.features ? 'bi-chevron-down' : 'bi-chevron-right'} mr-2 text-blue-600`}></i>
                  Features
                </h2>
                {expandedSections.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCompany.features.map(feature => (
                    <div key={feature.name} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-48 bg-gray-200">
                        <Image 
                          src={feature.image && feature.image.startsWith("/") ? feature.image : "/images/companies/placeholder.png"} 
                          alt={feature.name}
                          fill
                          style={{ objectFit: "cover" }}
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
                )}
              </div>
            )}
            
            {selectedCompany.subscriptions && (
              <div className="mb-8">
                <h2 
                  className="text-2xl font-bold mb-4 flex items-center cursor-pointer"
                  onClick={() => toggleSection('subscriptions')}
                >
                  <i className={`bi ${expandedSections.subscriptions ? 'bi-chevron-down' : 'bi-chevron-right'} mr-2 text-blue-600`}></i>
                  Subscription Plans
                </h2>
                {expandedSections.subscriptions && (
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
                )}
              </div>
            )}
            </div>
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