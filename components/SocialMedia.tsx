import React from 'react';
import { Github, Youtube, Linkedin, Facebook, Slack } from 'lucide-react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const SocialLink = [
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/yourchannel',
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yourprofile',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/yourprofile',
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: 'Slack',
    href: 'https://join.slack.com/t/yourworkspace/shared_invite/zt-1234567890-abcdefg',
    icon: <Slack className="w-5 h-5" />,
  },
];
interface Props{
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}
const SocialMedia = ({className,iconClassName,tooltipClassName}:Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {SocialLink.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("hover:text-white hoverEffect p-2 border rounded-full hover:border-green-400", iconClassName)}
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent side="top" className={cn("text-white gb-white font-semibold",tooltipClassName)}>{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
