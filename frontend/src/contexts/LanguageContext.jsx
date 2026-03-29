import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      academy: 'Academy',
      labs: 'Labs',
      aiBuilder: 'AI Builder',
      pricing: 'Pricing',
      blog: 'Blog',
      contact: 'Contact'
    },
    hero: {
      title: 'Build MVPs at Engine Speed.',
      subtitle: 'Precision engineering for the next generation of founders.',
      cta1: 'Launch Nexus',
      cta2: 'Request Audit'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      academy: 'Academia',
      labs: 'Laboratorios',
      aiBuilder: 'Constructor AI',
      pricing: 'Precios',
      blog: 'Blog',
      contact: 'Contacto'
    },
    hero: {
      title: 'Construye MVPs a velocidad de motor.',
      subtitle: 'Ingeniería de precisión para la próxima generación de fundadores.',
      cta1: 'Lanzar Nexus',
      cta2: 'Solicitar Auditoría'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      academy: 'Académie',
      labs: 'Labs',
      aiBuilder: 'Constructeur AI',
      pricing: 'Tarifs',
      blog: 'Blog',
      contact: 'Contact'
    },
    hero: {
      title: 'Construisez des MVP à la vitesse du moteur.',
      subtitle: 'Ingénierie de précision pour la prochaine génération de fondateurs.',
      cta1: 'Lancer Nexus',
      cta2: 'Demander un Audit'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      academy: 'Akademie',
      labs: 'Labs',
      aiBuilder: 'AI Builder',
      pricing: 'Preise',
      blog: 'Blog',
      contact: 'Kontakt'
    },
    hero: {
      title: 'Bauen Sie MVPs in Motorgeschwindigkeit.',
      subtitle: 'Präzisionsengineering für die nächste Generation von Gründern.',
      cta1: 'Nexus Starten',
      cta2: 'Audit Anfordern'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
