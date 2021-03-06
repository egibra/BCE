﻿// <auto-generated />
using System;
using Bce.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Bce.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.1-servicing-10028");

            modelBuilder.Entity("Bce.API.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Email");

                    b.Property<int>("RecordID");

                    b.HasKey("Id");

                    b.HasIndex("RecordID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Bce.API.Models.Record", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Email");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Records");
                });

            modelBuilder.Entity("Bce.API.Models.Comment", b =>
                {
                    b.HasOne("Bce.API.Models.Record", "Record")
                        .WithMany("Comments")
                        .HasForeignKey("RecordID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
