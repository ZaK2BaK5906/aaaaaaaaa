/**
 * Wrapper pour fetchNui de lb-phone
 */
export const fetchNui = async (eventName, data = {}) => {
  // Utiliser la fonction globale fetchNui fournie par lb-phone
  if (typeof globalThis.fetchNui === 'function') {
    try {
      return await globalThis.fetchNui(eventName, data);
    } catch (error) {
      console.error(`Error in fetchNui(${eventName}):`, error);
      return null;
    }
  }

  // Fallback pour le développement local
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] fetchNui: ${eventName}`, data);

    // Simuler des réponses pour le dev
    await new Promise(resolve => setTimeout(resolve, 100));

    switch (eventName) {
      case 'getBossData':
        return {
          money: 50000,
          jobName: 'Police',
          jobGrade: 'boss',
          societyName: 'society_police'
        };
      case 'getEmployees':
        return [
          {
            identifier: 'char1:1234',
            firstname: 'John',
            lastname: 'Doe',
            job: 'police',
            job_grade: 3,
            phone_number: '555-0100'
          },
          {
            identifier: 'char1:5678',
            firstname: 'Jane',
            lastname: 'Smith',
            job: 'police',
            job_grade: 2,
            phone_number: '555-0101'
          }
        ];
      case 'withdrawMoney':
      case 'depositMoney':
        return {
          success: true,
          balance: Math.floor(Math.random() * 100000)
        };
      case 'setJobGrade':
      case 'fireEmployee':
      case 'hireEmployee':
        return { success: true };
      default:
        return {};
    }
  }

  return null;
};

/**
 * Écouter les événements NUI
 */
export const onNuiEvent = (eventName, callback) => {
  if (typeof globalThis.onNuiEvent === 'function') {
    return globalThis.onNuiEvent(eventName, callback);
  }

  // Fallback pour le développement
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] Listening for event: ${eventName}`);
  }

  return () => {}; // Retourne une fonction de nettoyage vide
};
