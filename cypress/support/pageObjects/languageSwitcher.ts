import e2e from '../e2e';
import { Language } from '../languageTypes';

class LanguageSwitcher {
    private languageSelector = 'toggle-language';
  
    switchLang(language: Language){
        e2e.getByTestId(this.languageSelector).then(($button) => {
            if($button.length){
                cy.wrap($button).invoke('text').then((text) => {
                    if(language == text){
                        cy.wrap($button).click();
                    }
                })
            }
        })

    }
}

export default new LanguageSwitcher();