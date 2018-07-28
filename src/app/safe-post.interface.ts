import { SafeHtml } from '@angular/platform-browser';

export interface SafePost {
    'title': SafeHtml;
    'content': SafeHtml;
}
