import { Button, Container, SectionHeading } from '@/components/ui'
import ProductGrid from '@/components/product/ProductGrid'
import { featuredProducts } from '@/data/products'
import { wishlistItems } from '@/data/wishlist'

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Parents' favourites"
          description="The pieces parents reorder, gift and recommend most."
          action={
            <Button variant="outline" size="sm" href="#shop">
              Shop all products
            </Button>
          }
        />
        <ProductGrid products={featuredProducts.slice(0, 8)} wishlistIds={wishlistItems.map((item) => item.id)} className="mt-10" />
      </Container>
    </section>
  )
}
