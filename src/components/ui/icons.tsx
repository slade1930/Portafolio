import { FaGithub, FaLinkedin } from "react-icons/fa";

export function GithubIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return <FaGithub className={className} {...props} />;
}

export function LinkedinIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return <FaLinkedin className={className} {...props} />;
}
