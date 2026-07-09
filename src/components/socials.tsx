import {
  Clock,
  CodeXml,
  Link as LinkIcon,
  Mail,
  MapPin,
} from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { LocalTime } from "@/components/local-time";
import { SocialInfoItem } from "@/components/social-info-item";
import { getTranslations, type Locale } from "@/i18n";
import { CONTACT } from "@/lib/contact";

export function Socials({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <div className="-mx-4">
      <div
        data-slot="panel-body"
        className="grid gap-x-4 gap-y-2.5 p-4 sm:grid-cols-2"
      >
        {t.contact.roles.map((role) => (
          <SocialInfoItem
            key={`${role.label}-${role.company}`}
            icon={CodeXml}
            className="sm:col-span-2"
          >
            <p className="text-balance">
              {role.label}{" "}
              <span aria-label="at">@</span>
              <a className="link ml-0.5 font-medium" href={role.href}>
                {role.company}
              </a>
            </p>
          </SocialInfoItem>
        ))}

        <SocialInfoItem icon={MapPin}>
          <p className="text-balance">
            <a
              className="link"
              href={t.contact.locationHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Location: ${t.contact.location}`}
            >
              {t.contact.location}
            </a>
          </p>
        </SocialInfoItem>

        <SocialInfoItem icon={Clock}>
          <LocalTime timezone={CONTACT.timezone} />
        </SocialInfoItem>

        <SocialInfoItem icon={Mail} className="group">
          <p className="flex text-balance">
            <a
              className="link"
              href={`mailto:${CONTACT.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {CONTACT.email}
            </a>
          </p>
          <CopyButton value={CONTACT.email} />
        </SocialInfoItem>

        <SocialInfoItem icon={LinkIcon}>
          <p className="text-balance">
            <a
              className="link"
              href={CONTACT.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Personal website: ${CONTACT.websiteLabel}`}
            >
              {CONTACT.websiteLabel}
            </a>
          </p>
        </SocialInfoItem>
      </div>
    </div>
  );
}
