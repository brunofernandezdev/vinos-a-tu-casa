import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LucideAngularModule, Wine as LucideWine, Phone, Mail, MessageCircle, Gift, Sparkles, Menu, X } from "lucide-angular"

interface Espumante {
  title: string
  varietal: string
  region: string
  description: string
  price: string
  priceType: string
  alternativePrice?: string
  image: string
}

interface Promo {
  title: string
  varietal: string
  region: string
  description: string
  price: string
  priceType: string
  wines?: string[]
  image: string
}

interface ContactInfo {
  type: string
  icon: any
  value: string
  link: string
  description: string
  isWhatsApp?: boolean
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-amber-950">
      <!-- Header -->
      <header class="bg-black/30 backdrop-blur-md border-b border-soft-gold/20 sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <lucide-icon [img]="wineIcon" class="h-6 w-6 sm:h-8 sm:w-8 text-soft-gold"></lucide-icon>
              <h1 class="text-lg sm:text-2xl font-bold text-white font-cormorant tracking-wide">Vinos a tu casa</h1>
            </div>
            
            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex space-x-6">
              <button
                (click)="setActiveSection('home')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-2 rounded-md transition-all duration-300 font-montserrat ' + (activeSection === 'home' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Inicio
              </button>
              <button
                (click)="setActiveSection('vinos')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-2 rounded-md transition-all duration-300 font-montserrat ' + (activeSection === 'vinos' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Vinos
              </button>
              <button
                (click)="setActiveSection('espumantes')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-2 rounded-md transition-all duration-300 font-montserrat ' + (activeSection === 'espumantes' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Espumantes
              </button>
              <button
                (click)="setActiveSection('promos')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-2 rounded-md transition-all duration-300 font-montserrat ' + (activeSection === 'promos' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Promos
              </button>
              <button
                (click)="setActiveSection('contacto')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-2 rounded-md transition-all duration-300 font-montserrat ' + (activeSection === 'contacto' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Contacto
              </button>
            </nav>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="lg:hidden text-white hover:text-soft-gold p-2 rounded-md transition-colors"
            >
              <lucide-icon [img]="mobileMenuOpen ? closeIcon : menuIcon" class="h-6 w-6"></lucide-icon>
            </button>
          </div>

          <!-- Mobile Navigation -->
          <nav *ngIf="mobileMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-soft-gold/20 pt-4">
            <div class="flex flex-col space-y-2">
              <button
                (click)="setActiveSectionAndCloseMobile('home')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-3 rounded-md transition-all duration-300 font-montserrat text-left ' + (activeSection === 'home' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Inicio
              </button>
              <button
                (click)="setActiveSectionAndCloseMobile('vinos')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-3 rounded-md transition-all duration-300 font-montserrat text-left ' + (activeSection === 'vinos' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Vinos
              </button>
              <button
                (click)="setActiveSectionAndCloseMobile('espumantes')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-3 rounded-md transition-all duration-300 font-montserrat text-left ' + (activeSection === 'espumantes' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Espumantes
              </button>
              <button
                (click)="setActiveSectionAndCloseMobile('promos')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-3 rounded-md transition-all duration-300 font-montserrat text-left ' + (activeSection === 'promos' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Promos
              </button>
              <button
                (click)="setActiveSectionAndCloseMobile('contacto')"
                [class]="'text-white hover:text-soft-gold hover:bg-white/10 font-medium px-4 py-3 rounded-md transition-all duration-300 font-montserrat text-left ' + (activeSection === 'contacto' ? 'bg-white/10 text-soft-gold' : '')"
              >
                Contacto
              </button>
            </div>
          </nav>
        </div>
      </header>

      <!-- Home Section -->
      <main *ngIf="activeSection === 'home'" class="relative">
        <!-- Hero Section -->
        <section class="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            [style.background-image]="'url(' + wineImage + ')'"
            [style.filter]="'brightness(0.6) contrast(1.1)'"
          ></div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

          <div class="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <div class="animate-fade-in-up">
              <h2 class="text-4xl sm:text-6xl lg:text-7xl xl:text-9xl font-bold mb-6 sm:mb-8 text-gold-gradient glow-effect font-cormorant tracking-wider">
                Vinos a tu casa
              </h2>
            </div>
            <div class="animate-fade-in-up animate-delay-200">
              <p class="text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-8 sm:mb-10 text-bronze-gold font-light font-montserrat tracking-wide">
                Experiencias únicas en cada copa
              </p>
            </div>
            <div class="animate-fade-in-up animate-delay-400">
              <p class="text-sm sm:text-base lg:text-lg xl:text-xl mb-12 sm:mb-16 text-gray-200 max-w-3xl mx-auto font-light leading-relaxed font-montserrat">
                Descubrí nuestra exclusiva selección de vinos premium, cuidadosamente elegidos de las mejores bodegas argentinas. 
                Cada botella es una invitación a vivir momentos extraordinarios.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animate-delay-400">
              <button
                (click)="setActiveSection('vinos')"
                class="group bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-500 hover:to-yellow-600 text-white px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-2xl border-0 transition-all duration-500 hover:scale-110 hover:shadow-amber-600/25 rounded-full flex items-center justify-center font-montserrat"
              >
                <lucide-icon [img]="wineIcon" class="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300"></lucide-icon>
                Ver Vinos
              </button>
              <button
                (click)="setActiveSection('contacto')"
                class="group border-3 border-soft-gold text-soft-gold hover:bg-soft-gold hover:text-black px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-amber-500/25 rounded-full flex items-center justify-center font-montserrat backdrop-blur-sm bg-black/20"
              >
                <lucide-icon [img]="messageCircleIcon" class="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300"></lucide-icon>
                Contactar
              </button>
            </div>
          </div>
        </section>
      </main>

      <!-- Vinos Section -->
      <main *ngIf="activeSection === 'vinos'" class="relative py-12 sm:py-20">
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style="background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-red-950/80 to-black/90"></div>
        <div class="relative z-10 container mx-auto px-4">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-cormorant text-gold-gradient">Nuestros Vinos</h2>
            <p class="text-lg sm:text-xl text-bronze-gold font-light font-montserrat">Selección premium de las mejores bodegas argentinas</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div
              *ngFor="let vino of vinos"
              class="bg-black/50 backdrop-blur-sm border border-soft-gold/30 hover:border-soft-gold/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/10 rounded-xl overflow-hidden"
            >
              <div class="p-4 sm:p-6 pb-2">
                <div class="flex gap-3 sm:gap-4">
                  <div class="w-40 h-52 sm:w-48 sm:h-60 flex-shrink-0">
                    <img
                      [src]="vino.image"
                      [alt]="vino.title"
                      class="w-full h-full object-cover rounded-lg border border-soft-gold/30 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-10 relative cursor-pointer"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-white text-base sm:text-lg font-cormorant font-semibold mb-1 leading-tight">{{ vino.title }}</h3>
                    <p class="text-soft-gold text-sm font-medium font-montserrat">{{ vino.varietal }}</p>
                    <p class="text-gray-400 text-xs font-montserrat">{{ vino.region }}</p>
                  </div>
                </div>
              </div>
              <div class="p-4 sm:p-6 pt-0">
                <p class="text-gray-300 text-sm mb-4 font-light leading-relaxed font-montserrat">{{ vino.description }}</p>

                <div class="mb-6">
                  <div class="text-xl sm:text-2xl font-cormorant">
                    <ng-container *ngIf="vino.oldPrice; else normalPrice">
                      <span class="text-gray-400 line-through mr-2">{{ vino.oldPrice }}</span>
                      <span class="text-soft-gold font-bold">{{ vino.price }}</span>
                    </ng-container>
                    <ng-template #normalPrice>
                      <span class="text-soft-gold font-bold">{{ vino.price }}</span>
                    </ng-template>
                  </div>
                </div>

                <button
                  (click)="setActiveSection('contacto')"
                  class="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-semibold transition-all duration-300 hover:scale-105 py-3 px-4 rounded-lg flex items-center justify-center font-montserrat shadow-lg hover:shadow-amber-600/25 text-sm sm:text-base"
                >
                  <lucide-icon [img]="messageCircleIcon" class="mr-2 h-4 w-4"></lucide-icon>
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Espumantes Section -->
      <main *ngIf="activeSection === 'espumantes'" class="relative py-12 sm:py-20">
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style="background-image: url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=800&fit=crop');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-red-950/80 to-black/90"></div>
        <div class="relative z-10 container mx-auto px-4">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-cormorant text-gold-gradient">Espumantes</h2>
            <p class="text-lg sm:text-xl text-bronze-gold font-light font-montserrat">Celebrá cada momento con nuestros espumantes premium</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div
              *ngFor="let espumante of espumantes"
              class="bg-black/50 backdrop-blur-sm border border-soft-gold/30 hover:border-soft-gold/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/10 rounded-xl overflow-hidden"
            >
              <div class="p-4 sm:p-6 pb-2">
                <div class="flex gap-3 sm:gap-4">
                  <div class="w-40 h-52 sm:w-48 sm:h-60 flex-shrink-0">
                    <img
                      [src]="espumante.image"
                      [alt]="espumante.title"
                      class="w-full h-full object-cover rounded-lg border border-soft-gold/30 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-10 relative cursor-pointer"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-white text-base sm:text-lg font-cormorant font-semibold mb-1 leading-tight">{{ espumante.title }}</h3>
                    <p class="text-soft-gold text-sm font-medium font-montserrat">{{ espumante.varietal }}</p>
                    <p class="text-gray-400 text-xs font-montserrat">{{ espumante.region }}</p>
                  </div>
                </div>
              </div>
              <div class="p-4 sm:p-6 pt-0">
                <p class="text-gray-300 text-sm mb-4 font-light leading-relaxed font-montserrat">{{ espumante.description }}</p>

                <div class="mb-6">
                  <div class="text-soft-gold font-bold text-xl sm:text-2xl font-cormorant">{{ espumante.price }}</div>
                  <div class="text-gray-400 text-xs font-montserrat">{{ espumante.priceType }}</div>
                  <div *ngIf="espumante.alternativePrice" class="text-warm-gold text-sm font-medium mt-1 font-montserrat">
                    {{ espumante.alternativePrice }}
                  </div>
                </div>

                <button
                  (click)="setActiveSection('contacto')"
                  class="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-semibold transition-all duration-300 hover:scale-105 py-3 px-4 rounded-lg flex items-center justify-center font-montserrat shadow-lg hover:shadow-amber-600/25 text-sm sm:text-base"
                >
                  <lucide-icon [img]="sparklesIcon" class="mr-2 h-4 w-4"></lucide-icon>
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Promos Section -->
      <main *ngIf="activeSection === 'promos'" class="relative py-12 sm:py-20">
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style="background-image: url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&h=800&fit=crop');"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-red-950/80 to-black/90"></div>
        <div class="relative z-10 container mx-auto px-4">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-cormorant text-gold-gradient">Promociones Especiales</h2>
            <p class="text-lg sm:text-xl text-bronze-gold font-light font-montserrat">Aprovechá nuestras ofertas exclusivas</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div
              *ngFor="let promo of promos"
              class="bg-black/50 backdrop-blur-sm border border-soft-gold/30 hover:border-soft-gold/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-600/10 rounded-xl overflow-hidden"
            >
              <div class="p-4 sm:p-6 pb-2">
                <div class="flex gap-3 sm:gap-4">
                  <div class="w-40 h-52 sm:w-48 sm:h-60 flex-shrink-0">
                    <img
                      [src]="promo.image"
                      [alt]="promo.title"
                      class="w-full h-full object-cover rounded-lg border border-soft-gold/30 shadow-lg transition-transform duration-300 hover:scale-125 hover:z-10 relative cursor-pointer"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-white text-base sm:text-lg font-cormorant font-semibold mb-1 leading-tight">{{ promo.title }}</h3>
                    <p class="text-soft-gold text-sm font-medium font-montserrat">{{ promo.varietal }}</p>
                    <p class="text-gray-400 text-xs font-montserrat">{{ promo.region }}</p>
                  </div>
                </div>
              </div>
              <div class="p-4 sm:p-6 pt-0">
                <p class="text-gray-300 text-sm mb-4 font-light leading-relaxed font-montserrat">{{ promo.description }}</p>

                <div *ngIf="promo.wines" class="mb-4">
                  <h4 class="text-white font-semibold mb-2 font-cormorant text-sm">Incluye:</h4>
                  <ul class="text-gray-300 text-xs space-y-1">
                    <li *ngFor="let wine of promo.wines" class="flex items-start font-light font-montserrat">
                      <lucide-icon [img]="wineIcon" class="h-3 w-3 text-soft-gold mr-2 flex-shrink-0 mt-0.5"></lucide-icon>
                      {{ wine }}
                    </li>
                  </ul>
                </div>

                <div class="mb-6">
                  <div class="text-soft-gold font-bold text-xl sm:text-2xl font-cormorant">{{ promo.price }}</div>
                  <div class="text-gray-400 text-xs font-montserrat">{{ promo.priceType }}</div>
                </div>

                <button
                  (click)="setActiveSection('contacto')"
                  class="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-semibold transition-all duration-300 hover:scale-105 py-3 px-4 rounded-lg flex items-center justify-center font-montserrat shadow-lg hover:shadow-amber-600/25 text-sm sm:text-base"
                >
                  <lucide-icon [img]="giftIcon" class="mr-2 h-4 w-4"></lucide-icon>
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Contacto Section -->
      <main *ngIf="activeSection === 'contacto'" class="py-12 sm:py-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 font-cormorant text-gold-gradient">Contactanos</h2>
            <p class="text-lg sm:text-xl text-bronze-gold font-light font-montserrat">
              Estamos aquí para ayudarte a encontrar el vino perfecto
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div
              *ngFor="let contact of contactInfo"
              class="bg-black/50 backdrop-blur-sm border border-soft-gold/30 hover:border-soft-gold/60 transition-all duration-300 hover:scale-105 rounded-xl p-4 sm:p-6 hover:shadow-2xl hover:shadow-amber-600/10"
            >
              <div class="flex items-start space-x-3 sm:space-x-4">
                <div class="bg-gradient-to-br from-amber-700 to-amber-600 p-3 sm:p-4 rounded-full shadow-lg flex-shrink-0">
                  <div *ngIf="contact.isWhatsApp; else defaultIcon" class="h-5 w-5 sm:h-6 sm:w-6 text-white">
                    <!-- WhatsApp SVG Icon -->
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <ng-template #defaultIcon>
                    <lucide-icon [img]="contact.icon" class="h-5 w-5 sm:h-6 sm:w-6 text-white"></lucide-icon>
                  </ng-template>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-white font-bold text-base sm:text-lg mb-1 font-cormorant">{{ contact.type }}</h3>
                  <p class="text-bronze-gold text-sm mb-2 sm:mb-3 font-light font-montserrat">{{ contact.description }}</p>
                  <a
                    [href]="contact.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-soft-gold hover:text-warm-gold font-semibold text-base sm:text-lg transition-colors font-montserrat hover:underline break-all"
                  >
                    {{ contact.value }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-black/70 backdrop-blur-sm border-t border-soft-gold/20 py-6 sm:py-8">
        <div class="container mx-auto px-4 text-center">
          <div class="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <lucide-icon [img]="wineIcon" class="h-5 w-5 sm:h-6 sm:w-6 text-soft-gold"></lucide-icon>
            <span class="text-white font-bold text-base sm:text-lg font-cormorant tracking-wide">Vinos a tu casa</span>
          </div>
          <p class="text-gray-400 font-light font-montserrat text-sm sm:text-base">© 2024 Vinos a tu casa. Todos los derechos reservados.</p>
          <p class="text-gray-500 text-xs sm:text-sm mt-2 font-light font-montserrat">
            Venta de bebidas alcohólicas prohibida a menores de 18 años
          </p>
        </div>
      </footer>
    </div>
  `,
})
export class AppComponent {
  activeSection = "home"
  mobileMenuOpen = false
  wineImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vinos-452113115-612x612.jpg-HXI4QUo1k52HuW1U4Z4GBwsDAkY8cb.jpeg"

  // Lucide Icons
  wineIcon = LucideWine
  phoneIcon = Phone
  mailIcon = Mail
  messageCircleIcon = MessageCircle
  giftIcon = Gift
  sparklesIcon = Sparkles
  menuIcon = Menu
  closeIcon = X

  vinos: any[] = [
    {
      title: "Trumpeter Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Frutado, notas de ciruelas maduras, toques de chocolate y especias suaves",
      price: "$46.000",
      priceType: "Caja cerrada (Promo)",
      image: "assets/trumpeter-malbec.webp",
    },
    {
      title: "Luigi Bosca de Sangre",
      varietal: "Blend",
      region: "Mendoza, Argentina",
      description: "Frutado, cuerpo medio, vibrante",
      price: "$96.000",
      priceType: "Caja cerrada (Promo)",
      image: "assets/luigi-bosca-sangre.webp",
    },
    {
      title: "Bedz Malbec Estate 2017",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Aromas de frutos rojos, toques de violetas, con un final suave y elegante",
      price: "$36.000",
      priceType: "Caja cerrada",
      alternativePrice: "$12.000 (2 unidades)",
      image: "assets/bedz-estate-malbec.png",
    },
    {
      title: "Bedz Malbec Reserva 2015",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Complejo, con notas de frutas negras maduras, un toque de vainilla y un final especiado",
      price: "$54.000",
      priceType: "Caja cerrada",
      alternativePrice: "$18.000 (2 unidades)",
      image: "assets/bedz-malbec-reserva-2015.jpg",
    },
    {
      title: "De Moño Rojo Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Aromas herbáceos, con notas de frutos rojos y especias suaves, taninos elegantes",
      // oldPrice: "$75.000",        // precio tachado
      price: "$75.000", 
      priceType: "Caja cerrada",
      alternativePrice: "$20.000 (2 unidades)",
      image: "assets/de-mono-rojo.webp",
    },
    // {
    //   title: "Dominio Rutini Malbec",
    //   varietal: "Malbec",
    //   region: "Mendoza, Argentina",
    //   description: "Elegante, con notas de frutos rojos maduros, especias y un toque de roble",
    //   price: "$108.000",
    //   priceType: "Caja cerrada",
    //   alternativePrice: "Combina en distintos varietales: Chardonnay, Malbec, Cabernet Sauvignon, Cabernet Franc",
    //   image: "assets/dominio-rutini.webp",
    // },
    // {
    //   title: "Cepa Tradicional Bodega La Rural",
    //   varietal: "Cabernet Sauvignon, Malbec, Merlot, Pinot Noir, Semillon",
    //   region: "Mendoza, Argentina",
    //   description: "Variado, con notas frutales y toques especiados según el varietal",
    //   price: "$42.000",
    //   priceType: "Caja cerrada",
    //   alternativePrice: "Combina 2, 2 y 2 unidades",
    //   image: "assets/cepa-tradicional.png",
    // },
    {
      title: "Los Escasos Cabernet Sauvignon",
      varietal: "Cabernet Sauvignon",
      region: "Mendoza, Argentina",
      description: "Intenso, con notas de cassis, pimientos y especias, taninos firmes y elegantes",
      price: "$9.000",
      priceType: "Por unidad",
      image: "assets/los-escasos-cabernet.jpg",
    },
    {
      title: "Malabarista Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Aromas herbáceos, con notas de frutos rojos y especias suaves, taninos elegantes",
      price: "$12.000",
      priceType: "Por unidad",
      image: "assets/malabarista-cabernet-franc.jpg",
    },
    {
      title: "Kaiken Obertura Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Complejo, con notas de frutos negros, especias y un toque mineral",
      price: "$18.000",
      priceType: "Por unidad",
      image: "assets/kaiken-obertura.png",
    },
    {
      title: "UL Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Elegante, con notas de frutos rojos maduros y un toque de roble francés",
      price: "$25.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/ul-malbec.jpg",
    },
    {
      title: "Lui Umile Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Premium, con notas complejas de frutos negros, especias y un final persistente",
      price: "$25.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/lui-umile-malbec.jpg",
    },
    {
      title: "Virgen Malbec Orgánico",
      varietal: "Malbec Orgánico",
      region: "Mendoza, Argentina",
      description: "Orgánico, con notas frutales puras, sin sulfitos agregados, final limpio y natural",
      price: "$9.000",
      priceType: "Por unidad",
      image: "assets/virgen-malbec-organico.webp",
    },
  ]

  espumantes: any[] = [
    {
      title: "Espumante Animal Extra Brut",
      varietal: "Blend (Chardonnay y Pinot Noir)",
      region: "Mendoza, Argentina",
      description: "Fresco, con burbujas finas, notas de manzana verde y toques de pan tostado",
      price: "$48.000",
      priceType: "Caja cerrada (Promo)",
      image: "assets/espumante-animal-catena.jpg",
    },
    {
      title: "Espumante San Felipe Extra Dulce Rosé",
      varietal: "Rosé (Malbec)",
      region: "Mendoza, Argentina",
      description: "Dulce, con notas frutales de frambuesas y un toque floral",
      price: "$48.000",
      priceType: "Caja cerrada",
      alternativePrice: "Combina 3 de cada uno (Rosé/Malbec y Torrontés)",
      image: "assets/espumante-san-felipe-rose.jpg",
    },
    {
      title: "Espumante San Felipe Torrontés",
      varietal: "Torrontés",
      region: "Mendoza, Argentina",
      description: "Aromático, con notas florales y cítricas, burbujas finas y refrescante",
      price: "$48.000",
      priceType: "Caja cerrada",
      alternativePrice: "Combina 3 de cada uno (Rosé/Malbec y Torrontés)",
      image: "assets/espumante-san-felipe-torrontes.jpg",
    },
    {
      title: "Atemporal Extra Brut Chardonnay - Pinot Noir",
      varietal: "Chardonnay - Pinot Noir",
      region: "Mendoza, Argentina",
      description: "Fresco, con notas de manzana verde y un toque delicado de frutos rojos",
      price: "$11.000",
      priceType: "Por unidad",
      image: "assets/atemporal-extra-brut.png",
    },
  ]

  promos: any[] = [
    {
      title: "Promo RESERVA",
      varietal: "Combinación libre",
      region: "Mendoza, Argentina",
      description: "Combina como quieras hasta completar 6 unidades",
      wines: [
        "Malabarista Reserva Cabernet Franc - $12.000/u",
        "Kaiken Obertura - $18.000/u",
        "Bedz Reserva Malbec 2015 - $9.000/u",
      ],
      price: "Desde $9.000",
      priceType: "Precio por unidad según selección",
      image: "assets/malabarista-cabernet-franc.jpg",
    },
    {
      title: "Promo Especial",
      varietal: "Combinación libre",
      region: "Mendoza, Argentina",
      description: "Combina como quieras hasta completar 6 unidades",
      wines: [
        "Virgen Malbec Orgánico - $9.000/u",
        "Bedz Reserva Malbec 2015 - $9.000/u",
        "Los Escasos Cabernet Sauvignon - $9.000/u",
      ],
      price: "$9.000",
      priceType: "Por unidad",
      image: "assets/los-escasos-cabernet.jpg",
    },
    {
      title: "Promo Premium",
      varietal: "Combinación premium",
      region: "Mendoza, Argentina",
      description: "Selección premium con los mejores vinos",
      wines: ["Lui Umile Malbec (2 unidades) - $25.000", "UL Malbec (2 unidades) - $25.000"],
      price: "$25.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/lui-umile-malbec.jpg",
    },
    {
      title: "Promo",
      varietal: "Combinación libre",
      region: "Mendoza, Argentina",
      description: "Arma tu caja x6 combinando como quieras (x2 o x3)",
      wines: ["Mas Delirante - Blend de tintas", "Ojo de Agua - Cuvee", "Mara - Merlot / Cabernet Franc"],
      price: "$99.000",
      priceType: "Arma tu caja x6 combinando como quieras (x2 o x3)",
      image: "assets/promo-especial.jpeg",
    },
  ]

  
  contactInfo: any[] = [
    {
      type: "WhatsApp Valentina",
      icon: MessageCircle,
      value: "+54 9 351 392-0512",
      link: "https://wa.me/5493513920512?text=Hola%20Valentina!%20Estoy%20interesado%20en%20consultar%20sobre%20los%20vinos.%20¿Podrías%20ayudarme?",
      description: "Consultá disponibilidad y hacé tu pedido",
      isWhatsApp: true,
    },
    {
      type: "WhatsApp Julio",
      icon: MessageCircle,
      value: "+54 9 351 380-2776",
      link: "https://wa.me/5493513802776?text=Hola%20Julio!%20Estoy%20interesado%20en%20consultar%20sobre%20los%20vinos.%20¿Podrías%20ayudarme?",
      description: "Asesoramiento personalizado",
      isWhatsApp: true,
    },
  ]

  setActiveSection(section: string) {
    this.activeSection = section
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
  }

  setActiveSectionAndCloseMobile(section: string) {
    this.activeSection = section
    this.mobileMenuOpen = false
  }
}