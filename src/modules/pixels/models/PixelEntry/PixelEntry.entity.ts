export class PixelEntryEntity {
  readonly pixel_id: string;
  readonly visited_at: Date;

  constructor({
    pixel_id,
    visited_at,
  }: {
    pixel_id: string;
    visited_at: Date;
  }) {
    this.pixel_id = pixel_id;
    this.visited_at = visited_at;
  }
}
