import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(id: number) {
    return this.prismaService.review.findUnique({
      where: { id },
    });
  }

  create(createReviewDto: CreateReviewDto, user:any) {
    console.log(createReviewDto);
    return this.prismaService.review.create({
      data: {
        userEmail: user.email,
        profilePictureUrl: user.picture,
        text: createReviewDto.text,
        user: user.name,
        product: { connect: { id: createReviewDto.productId } },
      },
    });
  }

  delete(id: number) {
    return this.prismaService.review
      .delete({
        where: { id },
      })
      .catch((error) => {
        throw new NotFoundException("Review not found");
      });
  }
}
