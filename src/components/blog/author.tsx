import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

interface AuthorProps {
  name: string
  imageUrl: string
  twitterId: string
}

export function Author({ name, imageUrl, twitterId }: AuthorProps) {
  return (
    <Item
      size="sm"
      className="w-fit px-0 [a]:hover:bg-transparent"
      render={
        <a
          href={`https://x.com/${twitterId}`}
          target="_blank"
          rel="noreferrer"
        />
      }
    >
      <ItemMedia>
        <Avatar size="lg">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent className="gap-0">
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="text-xs">@{twitterId}</ItemDescription>
      </ItemContent>
    </Item>
  )
}
