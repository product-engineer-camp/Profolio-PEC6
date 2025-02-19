type ProfileTitleProps = {
  title: string;
};

export function ProfileTitle({ title }: ProfileTitleProps) {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}
