import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"
import { LucideAngularModule, MessageCircle, Menu, X, ArrowLeft, ArrowRight } from "lucide-angular"
import gsap from "gsap"

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
    <div>
      <nav class="nav-pill" aria-label="Navegación principal">
        <a class="nav-pill__wordmark" href="#top" (click)="closeMobileMenu()">
          Vinos <em style="color: var(--color-gold)">a tu casa</em>
        </a>

        <ul class="nav-pill__links">
          <li><a class="nav-pill__link" href="#top" [class.is-active]="activeNav === 'top'">Inicio</a></li>
          <li><a class="nav-pill__link" href="#vinos" [class.is-active]="activeNav === 'vinos'">Vinos</a></li>
          <li><a class="nav-pill__link" href="#espumantes" [class.is-active]="activeNav === 'espumantes'">Espumantes</a></li>
          <li><a class="nav-pill__link" href="#contacto" [class.is-active]="activeNav === 'contacto'">Contacto</a></li>
        </ul>

        <a class="nav-pill__cta" href="#contacto" data-magnetic>Comprar</a>

        <button
          class="nav-pill__toggle"
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="mobileMenuOpen"
          [attr.aria-label]="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        >
          <lucide-icon [img]="mobileMenuOpen ? closeIcon : menuIcon" class="h-5 w-5"></lucide-icon>
        </button>
      </nav>

      <div *ngIf="mobileMenuOpen" class="nav-sheet" role="menu">
        <a role="menuitem" class="nav-sheet__link" href="#top" [class.is-active]="activeNav === 'top'" (click)="closeMobileMenu()">Inicio</a>
        <a role="menuitem" class="nav-sheet__link" href="#vinos" [class.is-active]="activeNav === 'vinos'" (click)="closeMobileMenu()">Vinos</a>
        <a role="menuitem" class="nav-sheet__link" href="#espumantes" [class.is-active]="activeNav === 'espumantes'" (click)="closeMobileMenu()">Espumantes</a>
        <a role="menuitem" class="nav-sheet__link" href="#contacto" [class.is-active]="activeNav === 'contacto'" (click)="closeMobileMenu()">Contacto</a>
      </div>

      <!-- Hero -->
      <section id="top" class="hero">
        <div class="blooms" aria-hidden="true">
          <div data-bloom class="bloom" style="top:-10%; right:-8%; width:34rem; height:34rem; background: radial-gradient(circle, rgba(194,64,94,.35), rgba(194,64,94,0) 65%); animation: drift-a 16s ease-in-out infinite;"></div>
          <div data-bloom class="bloom" style="top:55%; left:-10%; width:30rem; height:30rem; background: radial-gradient(circle, rgba(224,169,109,.24), rgba(224,169,109,0) 65%); animation: drift-b 20s ease-in-out infinite;"></div>
        </div>

        <div class="container hero__grid">
          <div>
            <p class="eyebrow hero__eyebrow reveal">Los mejores vinos de Argentina</p>
            <h1 class="hero__title reveal">Vinos que<br />vale la pena<br /><span class="accent-italic">destapar.</span></h1>
            <p class="hero__lede reveal">
              Selección de autor de bodegas argentinas, elegida etiqueta por etiqueta.
              Consultanos por WhatsApp y armamos tu pedido a medida.
            </p>
            <div class="hero__actions reveal">
              <a class="btn btn--primary" data-magnetic href="#vinos">Explorar la colección</a>
              <a class="btn btn--outline" data-magnetic href="#contacto">Contactar →</a>
            </div>
          </div>

          <div class="hero__visual reveal" *ngIf="heroWine as w">
            <div class="hero__visual-glow" aria-hidden="true"></div>
            <img class="hero__bottle" [src]="w.image" [alt]="w.title" width="260" height="500" loading="eager" fetchpriority="high" />
            <div class="hero__tag">
              <div class="hero__tag-label">Etiqueta destacada</div>
              <div class="hero__tag-name">{{ w.title }}</div>
              <div class="hero__tag-meta">{{ w.region }} · {{ w.price }}</div>
            </div>
          </div>
        </div>

        <div class="scroll-cue">
          <span class="scroll-cue__pill"><span class="scroll-cue__dot"></span></span>
          Deslizá para descubrir
        </div>
      </section>

      <!-- Selección destacada -->
      <section class="section section--tight">
        <div class="container carousel">
          <div class="carousel__head">
            <div>
              <p class="eyebrow reveal">Selección destacada</p>
              <h2 class="section-head__title reveal" style="margin-top: 0.5rem">Para arrancar bien.</h2>
            </div>
            <div class="carousel__controls">
              <button class="carousel__btn" (click)="scrollCarousel(-1)" aria-label="Ver anteriores">
                <lucide-icon [img]="arrowLeftIcon" class="h-5 w-5"></lucide-icon>
              </button>
              <button class="carousel__btn" (click)="scrollCarousel(1)" aria-label="Ver siguientes">
                <lucide-icon [img]="arrowRightIcon" class="h-5 w-5"></lucide-icon>
              </button>
            </div>
          </div>

          <div class="carousel__track" #carouselTrack>
            <article class="carousel__card reveal" *ngFor="let vino of featuredVinos; trackBy: trackByTitle">
              <div class="carousel__card-glow" aria-hidden="true"></div>
              <div class="carousel__card-media">
                <img [src]="vino.image" [alt]="vino.title" loading="lazy" width="220" height="320" />
              </div>
              <p class="carousel__card-tag">{{ vino.varietal }} · {{ vino.region }}</p>
              <h3 class="carousel__card-name">{{ vino.title }}</h3>
              <div class="carousel__card-row">
                <span>{{ vino.priceType }}</span>
                <span class="carousel__card-price tabular-nums">{{ vino.price }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Manifiesto -->
      <section class="section">
        <div class="container manifesto">
          <p class="eyebrow manifesto__eyebrow reveal">Cómo elegimos</p>
          <div>
            <h2 class="manifesto__heading reveal">
              No es un catálogo. Es una selección que armamos a mano,
              <span class="accent-italic">botella por botella</span>.
            </h2>
            <p class="manifesto__lede reveal">
              Cada vino de esta lista lo probamos y elegimos nosotros — no un algoritmo.
              Si dudás entre dos etiquetas, escribinos: te contamos cuál conviene según la ocasión.
            </p>
          </div>
        </div>
      </section>

      <!-- Marquee -->
      <section class="marquee" aria-hidden="true">
        <div class="marquee__track">
          <span class="marquee__seg">Malbec <span class="marquee__dot">·</span> Cabernet Franc <span class="marquee__dot">·</span> Cabernet Sauvignon <span class="marquee__dot">·</span> Chardonnay <span class="marquee__dot">·</span> Torrontés <span class="marquee__dot">·</span> Pinot Noir <span class="marquee__dot">·</span> </span>
          <span class="marquee__seg">Malbec <span class="marquee__dot">·</span> Cabernet Franc <span class="marquee__dot">·</span> Cabernet Sauvignon <span class="marquee__dot">·</span> Chardonnay <span class="marquee__dot">·</span> Torrontés <span class="marquee__dot">·</span> Pinot Noir <span class="marquee__dot">·</span> </span>
        </div>
      </section>

      <!-- Vinos -->
      <section id="vinos" class="section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow section-head__eyebrow reveal">Colección</p>
            <h2 class="section-head__title reveal">Nuestra <span class="accent-italic">colección</span>.</h2>
            <p class="section-head__lede reveal">Bodegas de todo el país, etiqueta por etiqueta.</p>
          </div>

          <div class="product-grid">
            <article class="product reveal" *ngFor="let vino of vinos; trackBy: trackByTitle">
              <div class="product__media">
                <img [src]="vino.image" [alt]="vino.title" loading="lazy" width="400" height="500" />
              </div>
              <div class="product__body">
                <div class="product__tags">
                  <span class="product__varietal">{{ vino.varietal }}</span>
                  <span class="product__region">{{ vino.region }}</span>
                </div>
                <h3 class="product__name">{{ vino.title }}</h3>
                <p class="product__desc">{{ vino.description }}</p>
                <div class="product__price-row">
                  <div>
                    <span *ngIf="vino.oldPrice" class="product__price--old">{{ vino.oldPrice }}</span>
                    <span class="product__price tabular-nums">{{ vino.price }}</span>
                  </div>
                  <div class="product__price-type">{{ vino.priceType }}</div>
                </div>
                <a class="btn btn--outline btn--sm btn--block product__action" href="#contacto">Consultar →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Espumantes -->
      <section id="espumantes" class="section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow section-head__eyebrow reveal">Para brindar</p>
            <h2 class="section-head__title reveal">Espumantes</h2>
            <p class="section-head__lede reveal">Etiquetas para celebrar cada momento.</p>
          </div>

          <div class="product-grid">
            <article class="product reveal" *ngFor="let espumante of espumantes; trackBy: trackByTitle">
              <div class="product__media">
                <img [src]="espumante.image" [alt]="espumante.title" loading="lazy" width="400" height="500" />
              </div>
              <div class="product__body">
                <div class="product__tags">
                  <span class="product__varietal">{{ espumante.varietal }}</span>
                  <span class="product__region">{{ espumante.region }}</span>
                </div>
                <h3 class="product__name">{{ espumante.title }}</h3>
                <p class="product__desc">{{ espumante.description }}</p>
                <div class="product__price-row">
                  <div class="product__price tabular-nums">{{ espumante.price }}</div>
                  <div class="product__price-type">{{ espumante.priceType }}</div>
                </div>
                <a class="btn btn--outline btn--sm btn--block product__action" href="#contacto">Consultar →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Cómo pedís -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow section-head__eyebrow reveal">Cómo pedís</p>
            <h2 class="section-head__title reveal">Simple, directo, por WhatsApp.</h2>
          </div>
          <div class="steps">
            <div class="step reveal">
              <div class="step__num">01</div>
              <h3 class="step__title">Elegís</h3>
              <p class="step__body">Mirás el catálogo de vinos y espumantes y elegís lo que te copa.</p>
            </div>
            <div class="step reveal">
              <div class="step__num">02</div>
              <h3 class="step__title">Consultás</h3>
              <p class="step__body">Nos escribís por WhatsApp — Valentina o Julio te asesoran según la ocasión.</p>
            </div>
            <div class="step reveal">
              <div class="step__num">03</div>
              <h3 class="step__title">Recibís</h3>
              <p class="step__body">Coordinamos el envío directo a tu casa.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contacto -->
      <section id="contacto" class="section">
        <div class="container">
          <div class="cta-band reveal">
            <p class="eyebrow cta-band__eyebrow">Tu próxima botella te espera</p>
            <h2 class="cta-band__title">Empecemos.</h2>
          </div>
          <p class="contact-lede reveal">Te asesoramos personalmente por WhatsApp para armar tu pedido.</p>

          <div class="contact-grid">
            <div class="contact-card reveal" *ngFor="let contact of contactInfo; trackBy: trackByType">
              <div class="contact-card__icon">
                <svg *ngIf="contact.isWhatsApp; else defaultIcon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <ng-template #defaultIcon>
                  <lucide-icon [img]="contact.icon" style="width: 20px; height: 20px;"></lucide-icon>
                </ng-template>
              </div>
              <div>
                <h3 class="contact-card__type">{{ contact.type }}</h3>
                <p class="contact-card__desc">{{ contact.description }}</p>
                <a [href]="contact.link" target="_blank" rel="noopener noreferrer" class="contact-card__value" data-magnetic>{{ contact.value }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="foot-stmt">
        <div class="container foot-stmt__row">
          <span class="foot-stmt__wordmark">Vinos <em style="color: var(--color-gold)">a tu casa</em></span>
          <span class="foot-stmt__legal">© {{ currentYear }} · Venta de bebidas alcohólicas prohibida a menores de 18 años</span>
        </div>
      </footer>
    </div>
  `,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  mobileMenuOpen = false
  activeNav = "top"
  currentYear = new Date().getFullYear()

  @ViewChild("carouselTrack") carouselTrack?: ElementRef<HTMLDivElement>

  // Lucide Icons
  menuIcon = Menu
  closeIcon = X
  arrowLeftIcon = ArrowLeft
  arrowRightIcon = ArrowRight

  private cleanupFns: Array<() => void> = []
  private featuredTitles = [
    "Viamonte Icono Malbec 2020",
    "Dominio Rutini Malbec",
    "Mil Demonios Malbec",
    "Ernesto Catena Tikal Natural Bivarietal",
    "Filippo Figari Malbec Reserva",
    "Casa de Herrero Pinot Noir",
  ]

  constructor(private zone: NgZone) {}

  vinos: any[] = [
    {
      title: "Trumpeter Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Frutado, notas de ciruelas maduras, toques de chocolate y especias suaves",
      price: "$48.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/trumpeter-malbec.png",
    },
    {
      title: "Trumpeter Sauvignon Blanc",
      varietal: "Sauvignon Blanc",
      region: "Mendoza, Argentina",
      description: "Fresco y frutal, con aromas cítricos de pomelo y limón, notas vegetales y minerales, entrada fresca y chispeante",
      price: "$48.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/trumpeter-sauvigob-blanc.png",
    },
    {
      title: "Trumpeter Merlot",
      varietal: "Merlot",
      region: "Mendoza, Argentina",
      description: "Intenso en nariz con aromas a cereza, ciruela y notas especiadas, taninos suaves y sedosos, final persistente",
      price: "$48.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/trumpeter-merlot.png",
    },
    {
      title: "Luigi Bosca de Sangre",
      varietal: "Blend",
      region: "Mendoza, Argentina",
      description: "Frutado, cuerpo medio, vibrante",
      price: "$96.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/luigi-bosca-sangre.png",
    },
    {
      title: "Bedz Malbec Estate 2022",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Aromas de frutos rojos, toques de violetas, con un final suave y elegante",
      price: "$45.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "$12.000 (2 unidades)",
      image: "assets/cutout/bedz-estate-malbec.png",
    },
    {
      title: "Bedz Malbec Reserva 2021",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Complejo, con notas de frutas negras maduras, un toque de vainilla y un final especiado",
      price: "55.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "$18.000 (2 unidades)",
      image: "assets/cutout/bedz-malbec-reserva-2015-2.png",
    },
    {
      title: "De Moño Rojo Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Aromas herbáceos, con notas de frutos rojos y especias suaves, taninos elegantes",
      // oldPrice: "$75.000",        // precio tachado
      price: "$75.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "$20.000 (2 unidades)",
      image: "assets/cutout/de-mono-rojo.png",
    },
    {
      title: "Dominio Rutini Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Elegante, con notas de frutos rojos maduros, especias y un toque de roble",
      price: "$120.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Combina en distintos varietales: Chardonnay, Malbec, Cabernet Sauvignon, Cabernet Franc",
      image: "assets/cutout/dominio-rutini-2.png",
    },
    // {
    //   title: "Cepa Tradicional Bodega La Rural",
    //   varietal: "Cabernet Sauvignon, Malbec, Merlot, Pinot Noir, Semillon",
    //   region: "Mendoza, Argentina",
    //   description: "Variado, con notas frutales y toques especiados según el varietal",
    //   price: "$42.000",
    //   priceType: "Caja x 6 unidades",
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
      image: "assets/cutout/los-escasos-cabernet.png",
    },
    {
      title: "Malabarista Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Aromas herbáceos, con notas de frutos rojos y especias suaves, taninos elegantes",
      price: "$12.000",
      priceType: "Por unidad",
      image: "assets/cutout/malabarista-cabernet-franc.png",
    },
    {
      title: "Kaiken Obertura Cabernet Franc",
      varietal: "Cabernet Franc",
      region: "Mendoza, Argentina",
      description: "Complejo, con notas de frutos negros, especias y un toque mineral",
      price: "$18.000",
      priceType: "Por unidad",
      image: "assets/cutout/kaiken-obertura.png",
    },
    {
      title: "UL Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Elegante, con notas de frutos rojos maduros y un toque de roble francés",
      price: "2 x $28.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/cutout/ul-malbec.png",
    },
    {
      title: "Lui Umile Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Premium, con notas complejas de frutos negros, especias y un final persistente",
      price: "$25.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/cutout/lui-umile-malbec.png",
    },
    {
      title: "Virgen Malbec Orgánico",
      varietal: "Malbec Orgánico",
      region: "Mendoza, Argentina",
      description: "Orgánico, con notas frutales puras, sin sulfitos agregados, final limpio y natural",
      price: "$9.000",
      priceType: "Por unidad",
      image: "assets/cutout/virgen-malbec-organico.png",
    },
    {
      title: "Callejón de las Brujas",
      varietal: "Malbec, Cabernet Franc, Cabernet Sauvignon",
      region: "Mendoza, Argentina",
      description: "Aromas de frutos rojos y negros, violetas y chocolate, estructura elegante con taninos suaves y maduros",
      price: "$69.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Combinables - 3 variedades: Malbec, Cabernet Franc y Cabernet Sauvignon",
      image: "assets/cutout/callejon-de-las-brujas.png",
    },
    // {
    //   title: "Temporada Malbec 2024",
    //   varietal: "Malbec",
    //   region: "Mendoza, Argentina",
    //   description: "Malbec joven y vibrante, notas de frutos rojos frescos, taninos suaves y agradables, ideal para disfrutar ahora",
    //   price: "$39.000",
    //   priceType: "Caja x 6 unidades",
    //   image: "assets/Temporada-malbec-2024.png",
    // },
    {
      title: "Filippo Figari Malbec Reserva",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Aromas de chocolate, avellanas y frutos del bosque, cuerpo medio-alto con final cálido y persistente",
      price: "$59.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Malbec Reserva: $59.000",
      image: "assets/cutout/filippo_figari_the_house_malbec_2020_family_collection.png",
    },
    {
      title: "Filippo Figari Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Aromas de chocolate, avellanas y frutos del bosque, cuerpo medio-alto con final cálido y persistente",
      price: "$42.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Malbec: $42.000",
      image: "assets/cutout/filippo-figari-2020-2.png",
    },
    {
      title: "Mil Demonios Malbec",
      varietal: "Malbec",
      region: "Valle de Uco, Mendoza",
      description: "Gran cuerpo y personalidad, notas de frutos negros, roble, chocolate amargo y tabaco, selección de uvas premium",
      price: "$105.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/Mil-Demonios-Malbec-scaled.png",
    },
    {
      title: "Ernesto Catena Mara",
      varietal: "Vino Orgánico",
      region: "Valle de Uco, Mendoza",
      description: "Orgánico del Valle de Uco, notas de cerezas negras, moras, especias y pimienta negra, taninos suaves e integrados",
      price: "$95.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/ernesto-catena-mara-2.png",
    },
    {
      title: "Ernesto Catena Tikal Natural Bivarietal",
      varietal: "Malbec - Syrah",
      region: "Valle de Uco, Mendoza",
      description: "Biodinámico del Valle de Uco, aromas de cerezas frescas, frambuesas negras y cacao especiado, equilibrado y elegante",
      price: "$119.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/Eernesto-catena-tikal-natural.png",
    },
    {
      title: "Encuentro de Rutini Malbec",
      varietal: "Malbec",
      region: "Valle de Uco, Mendoza",
      description: "Aromas intensos de ciruelas maduras, cerezas negras y notas de vainilla, taninos sedosos con final prolongado y elegante",
      price: "$66.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/encuentro-rutini-2.png",
    },
    {
      title: "El Joven Equilibrista Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Fresco y frutal, con notas de frutos rojos, violetas y un toque especiado, ideal para disfrutar joven",
      price: "$54.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/vino-el-joven-equilibrista-malbec-bodega-el-equilibrista.png",
    },
    {
      title: "Kaiken Indómito Malbec",
      varietal: "Malbec",
      region: "Mendoza, Argentina",
      description: "Intenso y expresivo, con aromas de moras, cassis y sutiles notas de roble, cuerpo medio con taninos aterciopelados",
      price: "$63.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/Kaiken-indomito.png",
    },
    {
      title: "Ricardo Santos Malbec - Semillón",
      varietal: "Malbec - Semillón",
      region: "Mendoza, Argentina",
      description: "Blend único con aromas de frutos negros y toques florales del Semillón, equilibrado con acidez refrescante y final persistente",
      price: "$63.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/Ricardo-santos-malbec.png",
    },
    {
      title: "Viamonte Icono Malbec 2020",
      varietal: "Malbec",
      region: "Luján de Cuyo, Mendoza",
      description: "Color rojo violáceo intenso y destellos púrpura. Aromas complejos donde se destaca fruta roja bien madura como mermelada de ciruelas. Su crianza en roble francés por 24 meses y sus posteriores 12 meses en estiba le aportan notas de vainilla. Vino aterciopelado con un final extenso",
      price: "$119.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/Valmonte-winery-icono.png",
    },
    {
      title: "Finca Martha Merlot 2021",
      varietal: "Merlot",
      region: "San Rafael, Mendoza",
      description: "Color rojo rubí intenso con destellos violáceos. Aromas de frutos negros maduros, ciruela y notas de chocolate y tabaco. Taninos suaves y bien integrados, cuerpo medio y final prolongado y elegante",
      price: "$59.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/finca-martha-merlot-2021-2.png",
    },
    {
      title: "Salentein Numina Cabernet Sauvignon",
      varietal: "Cabernet Sauvignon",
      region: "Valle de Uco, Mendoza",
      description: "Intenso y complejo, con aromas a cassis, frutos negros y notas especiadas de pimienta y tabaco. Proveniente del Valle de Uco, criado en roble francés, con taninos maduros y un final persistente y elegante",
      price: "$80.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/numina-2.png",
    },
    {
      title: "Atemporal Blend",
      varietal: "Malbec - Cabernet Sauvignon - Petit Verdot",
      region: "Valle de Uco, Mendoza",
      description: "Corte de Malbec, Cabernet Sauvignon y Petit Verdot del viñedo Albaneve. Aromas de frutos rojos, violeta, ciruelas y arándanos con toques de regaliz y especias. Criado en roble francés, elegante y de gran estructura",
      price: "$72.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/atemporal-blend-2.png",
    },
    {
      title: "Casa de Herrero Pinot Noir",
      varietal: "Pinot Noir",
      region: "Vistaflores, Valle de Uco",
      description: "100% Pinot Noir de altura, frutos rojos frescos como frutillas y grosellas con delicadas notas florales y leve toque herbáceo. Jugoso y vibrante, con textura ligera, taninos suaves y acidez refrescante. Final limpio y frutal",
      price: "$72.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/casa-de-herrero-2.png",
    },
  ]

  espumantes: any[] = [
    {
      title: "Espumante Animal Extra Brut",
      varietal: "Blend (Chardonnay y Pinot Noir)",
      region: "Mendoza, Argentina",
      description: "Fresco, con burbujas finas, notas de manzana verde y toques de pan tostado",
      price: "$48.000",
      priceType: "Caja x 6 unidades",
      image: "assets/cutout/espumante-animal-catena.png",
    },
    {
      title: "Espumante San Felipe Extra Dulce Rosé",
      varietal: "Rosé (Malbec)",
      region: "Mendoza, Argentina",
      description: "Dulce, con notas frutales de frambuesas y un toque floral",
      price: "$50.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Combina 3 de cada uno (Rosé/Malbec y Torrontés)",
      image: "assets/cutout/espumante-san-felipe-rose.png",
    },
    {
      title: "Espumante San Felipe Torrontés",
      varietal: "Torrontés",
      region: "Mendoza, Argentina",
      description: "Aromático, con notas florales y cítricas, burbujas finas y refrescante",
      price: "$50.000",
      priceType: "Caja x 6 unidades",
      alternativePrice: "Combina 3 de cada uno (Rosé/Malbec y Torrontés)",
      image: "assets/cutout/espumante-san-felipe-torrontes.png",
    },
    {
      title: "Atemporal Extra Brut Chardonnay - Pinot Noir",
      varietal: "Chardonnay - Pinot Noir",
      region: "Mendoza, Argentina",
      description: "Fresco, con notas de manzana verde y un toque delicado de frutos rojos",
      price: "$11.000",
      priceType: "Por unidad",
      image: "assets/cutout/atemporal-extra-brut.png",
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
      image: "assets/cutout/malabarista-cabernet-franc.png",
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
      image: "assets/cutout/los-escasos-cabernet.png",
    },
    {
      title: "Promo Premium",
      varietal: "Combinación premium",
      region: "Mendoza, Argentina",
      description: "Selección premium con los mejores vinos",
      wines: ["Lui Umile Malbec (2 unidades) - $25.000", "UL Malbec (2 unidades) - $25.000"],
      price: "$25.000",
      priceType: "Por combinación de 2 unidades",
      image: "assets/cutout/lui-umile-malbec.png",
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

  get featuredVinos(): any[] {
    return this.featuredTitles
      .map((title) => this.vinos.find((v) => v.title === title))
      .filter((v): v is any => !!v)
  }

  get heroWine(): any {
    return this.featuredVinos[0] ?? this.vinos[0]
  }

  trackByTitle(_index: number, item: { title: string }): string {
    return item.title
  }

  trackByType(_index: number, item: { type: string }): string {
    return item.type
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false
  }

  scrollCarousel(direction: number) {
    const el = this.carouselTrack?.nativeElement
    if (!el) return
    const amount = Math.min(el.clientWidth * 0.9, 420)
    el.scrollBy({ left: direction * amount, behavior: "smooth" })
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.setupSectionObserver()
      this.setupReveal()

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const finePointer = window.matchMedia("(pointer: fine)").matches

      if (!reducedMotion) {
        this.setupMagnetic()
      }
      if (!reducedMotion && finePointer) {
        this.setupCustomCursor()
        this.setupParallax()
      }
    })
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach((fn) => {
      try {
        fn()
      } catch {
        // no-op
      }
    })
  }

  private setupSectionObserver() {
    const ids = ["top", "vinos", "espumantes", "contacto"]
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            this.zone.run(() => {
              this.activeNav = id
            })
          }
        })
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    this.cleanupFns.push(() => io.disconnect())
  }

  private setupReveal() {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    // Opt in to the hidden-then-fade treatment only once JS is confirmed
    // running — content is visible by default until this line executes,
    // so a script error or slow load never leaves a section permanently blank.
    els.forEach((el) => el.classList.add("pre-reveal"))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    )
    els.forEach((el) => io.observe(el))
    this.cleanupFns.push(() => io.disconnect())

    const safety = setTimeout(() => els.forEach((el) => el.classList.add("is-visible")), 1200)
    this.cleanupFns.push(() => clearTimeout(safety))
  }

  private setupMagnetic() {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"))
    els.forEach((el) => {
      const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" })
      const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" })
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        qx((e.clientX - (r.left + r.width / 2)) * 0.3)
        qy((e.clientY - (r.top + r.height / 2)) * 0.4)
      }
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" })
      el.addEventListener("mousemove", move)
      el.addEventListener("mouseleave", leave)
      this.cleanupFns.push(() => {
        el.removeEventListener("mousemove", move)
        el.removeEventListener("mouseleave", leave)
      })
    })
  }

  private setupCustomCursor() {
    const ring = document.createElement("div")
    ring.className = "cursor-ring"
    const dot = document.createElement("div")
    dot.className = "cursor-dot"
    document.body.appendChild(ring)
    document.body.appendChild(dot)
    document.body.classList.add("has-custom-cursor")

    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" })
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" })
    const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2" })
    const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2" })

    const move = (e: MouseEvent) => {
      rx(e.clientX)
      ry(e.clientY)
      dx(e.clientX)
      dy(e.clientY)
    }
    window.addEventListener("mousemove", move)

    const hoverEls = Array.from(document.querySelectorAll<HTMLElement>("a, button"))
    const onEnter = () => gsap.to(ring, { scale: 1.9, borderColor: "#e0a96d", duration: 0.25 })
    const onLeave = () => gsap.to(ring, { scale: 1, borderColor: "rgba(242,235,227,.7)", duration: 0.25 })
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    this.cleanupFns.push(() => {
      window.removeEventListener("mousemove", move)
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
      ring.remove()
      dot.remove()
      document.body.classList.remove("has-custom-cursor")
    })
  }

  private setupParallax() {
    const orbs = Array.from(document.querySelectorAll<HTMLElement>("[data-bloom]"))
    if (!orbs.length) return
    const qys = orbs.map((el) => gsap.quickTo(el, "y", { duration: 0.6, ease: "power2" }))
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        orbs.forEach((_el, i) => qys[i](y * (0.06 + i * 0.03)))
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    this.cleanupFns.push(() => window.removeEventListener("scroll", onScroll))
  }
}
